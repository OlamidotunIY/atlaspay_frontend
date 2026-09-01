import { useState } from 'react';
import { useLogin } from '../data/mutations/use-login.mutation.js';
import { useVerifyMfa } from '../data/mutations/use-verify-mfa.mutation.js';
import { useChangeTemporaryPassword } from '../data/mutations/use-change-temp-password.mutation.js';
import { useSetupPassword } from '../data/mutations/use-setup-password.mutation.js';
import { useVerifyEmail } from '../data/mutations/use-verify-email.mutation.js';
import { useResendSetupToken } from '../data/mutations/use-resend-setup-token.mutation.js';
import { useAuthStore } from './use-auth-store.js';
import {
  LoginRequestDto,
  ChangeTemporaryPasswordRequestDto,
  SetupPasswordRequestDto,
  CompleteVerificationRequestDto,
  OnboardingStatus,
} from '../data/adapters/rest-api/auth.dto.js';
import { AuthStep } from '../domain/value-objects/auth-step.enum.js';
import { MERCHANT_ROUTES } from '@org/shared';

export const AUTH_STEP_ROUTES: Partial<Record<AuthStep, string>> = {
  [AuthStep.REQUIRES_2FA]: MERCHANT_ROUTES.TWO_FACTOR_AUTH,
  [AuthStep.REQUIRES_VERIFICATION]: MERCHANT_ROUTES.VERIFY_EMAIL,
  [AuthStep.REQUIRES_PASSWORD_SETUP]: MERCHANT_ROUTES.SETUP_PASSWORD,
  [AuthStep.REQUIRES_ORG_SETUP]: MERCHANT_ROUTES.ONBOARDING_ORGANIZATION,
  [AuthStep.SUCCESS]: MERCHANT_ROUTES.DASHBOARD,
};

import { create } from 'zustand';

interface AuthFlowState {
  step: AuthStep;
  authData: {
    identifier?: string;
    preAuthToken?: string;
    setupToken?: string;
    invitationToken?: string;
  };
  setStep: (step: AuthStep) => void;
  setAuthData: (data: Partial<AuthFlowState['authData']>) => void;
}

export const useAuthFlowStore = create<AuthFlowState>((set) => ({
  step: AuthStep.IDLE,
  authData: {},
  setStep: (step) => set({ step }),
  setAuthData: (data) =>
    set((state) => ({ authData: { ...state.authData, ...data } })),
}));

export function useAuthFlow() {
  const { step, setStep, authData, setAuthData } = useAuthFlowStore();
  const [error, setError] = useState<Error | null>(null);

  const { mutateAsync: login } = useLogin();
  const { mutateAsync: verifyMfa } = useVerifyMfa();
  const { mutateAsync: changePassword } = useChangeTemporaryPassword();
  const { mutateAsync: setupPassword } = useSetupPassword();
  const { mutateAsync: verifyEmail } = useVerifyEmail();
  const { mutateAsync: resendToken } = useResendSetupToken();
  const { setTokens } = useAuthStore();

  const handleAuthResult = (response: {
    type: string;
    preAuthToken?: string;
    identifier?: string;
    tokens?: {
      accessToken: string;
      refreshToken?: string;
      accessExpiresAt: string;
    };
    onboardingStatus?: string;
  }): AuthStep => {
    let nextStep = AuthStep.IDLE;

    if (response.type === 'requires_2fa') {
      setAuthData({ preAuthToken: response.preAuthToken });
      nextStep = AuthStep.REQUIRES_2FA;
    } else if (response.type === 'requires_password_change') {
      setAuthData({ identifier: response.identifier });
      // Using PASSWORD_SETUP route for both change and setup for now, or you can add a dedicated route.
      nextStep = AuthStep.REQUIRES_PASSWORD_SETUP;
    } else if (response.type === 'success' && response.tokens) {
      setTokens(
        response.tokens.accessToken,
        response.tokens.refreshToken || '',
        response.tokens.accessExpiresAt,
      );

      const status = response.onboardingStatus as OnboardingStatus;
      if (status === 'NO_ORG') {
        nextStep = AuthStep.REQUIRES_ORG_SETUP;
      } else {
        nextStep = AuthStep.SUCCESS;
      }
    }

    setStep(nextStep);
    return nextStep;
  };

  const getTargetRoute = (
    currentStep: AuthStep,
    fallback?: string,
  ): string | undefined => {
    return AUTH_STEP_ROUTES[currentStep] || fallback;
  };

  const submitLogin = async (
    credentials: LoginRequestDto,
    fallbackRoute?: string,
  ): Promise<string | undefined> => {
    setStep(AuthStep.LOADING);
    setError(null);
    try {
      const response = await login(credentials);
      const nextStep = handleAuthResult(response);
      return getTargetRoute(nextStep, fallbackRoute);
    } catch (error: unknown) {
      const err = error as Error & { errorCode?: string };
      if (
        err.errorCode === 'ACCOUNT_UNVERIFIED' ||
        err.name === 'AccountUnverifiedError'
      ) {
        setAuthData({ identifier: credentials.identifier });
        setStep(AuthStep.REQUIRES_VERIFICATION);
        return getTargetRoute(AuthStep.REQUIRES_VERIFICATION, fallbackRoute);
      } else {
        setError(error instanceof Error ? error : new Error(String(error)));
        setStep(AuthStep.ERROR);
        return undefined;
      }
    }
  };

  const submitMfa = async (
    code: string,
    fallbackRoute?: string,
  ): Promise<string | undefined> => {
    if (!authData.preAuthToken) return;
    setStep(AuthStep.LOADING);
    setError(null);
    try {
      const tokens = await verifyMfa({
        preAuthToken: authData.preAuthToken,
        code,
      });
      setTokens(
        tokens.accessToken,
        tokens.refreshToken || '',
        tokens.accessExpiresAt,
      );
      setStep(AuthStep.SUCCESS);
      return getTargetRoute(AuthStep.SUCCESS, fallbackRoute);
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
      setStep(AuthStep.ERROR);
      return undefined;
    }
  };

  const submitPasswordChange = async (
    payload: ChangeTemporaryPasswordRequestDto,
    fallbackRoute?: string,
  ): Promise<string | undefined> => {
    setStep(AuthStep.LOADING);
    setError(null);
    try {
      const response = await changePassword(payload);
      const nextStep = handleAuthResult(response);
      return getTargetRoute(nextStep, fallbackRoute);
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
      setStep(AuthStep.ERROR);
      return undefined;
    }
  };

  const submitPasswordSetup = async (
    payload: SetupPasswordRequestDto,
    fallbackRoute?: string,
  ): Promise<string | undefined> => {
    setStep(AuthStep.LOADING);
    setError(null);
    try {
      const response = await setupPassword(payload);
      const nextStep = handleAuthResult(response);
      return getTargetRoute(nextStep, fallbackRoute);
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
      setStep(AuthStep.ERROR);
      return undefined;
    }
  };

  const submitEmailVerification = async (
    payload: CompleteVerificationRequestDto,
    fallbackRoute?: string,
  ): Promise<string | undefined> => {
    setStep(AuthStep.LOADING);
    setError(null);
    try {
      const response = await verifyEmail(payload);
      if (response.nextAction === 'SETUP_PASSWORD' && response.sessionToken) {
        setAuthData({ setupToken: response.sessionToken });
        // We explicitly save the session token to the global store so the /setup-password API can authenticate the user
        setTokens(response.sessionToken, '', '');
        setStep(AuthStep.REQUIRES_PASSWORD_SETUP);
        return getTargetRoute(AuthStep.REQUIRES_PASSWORD_SETUP, fallbackRoute);
      } else {
        setStep(AuthStep.IDLE);
        return fallbackRoute;
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
      setStep(AuthStep.ERROR);
      return undefined;
    }
  };

  const resendSetupEmail = async (identifier: string) => {
    setError(null);
    try {
      await resendToken(identifier);
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error(String(error)));
    }
  };

  const initializeSetupFlow = (setupToken: string) => {
    setAuthData({ setupToken });
    setStep(AuthStep.REQUIRES_PASSWORD_SETUP);
  };

  const initializeInvitation = (invitationToken: string) => {
    setAuthData({ invitationToken });
  };

  return {
    step,
    error,
    authData,
    setStep,
    initializeSetupFlow,
    initializeInvitation,
    submitLogin,
    submitMfa,
    submitPasswordChange,
    submitPasswordSetup,
    submitEmailVerification,
    resendSetupEmail,
    getTargetRoute,
  };
}
