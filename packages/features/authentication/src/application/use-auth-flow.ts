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
  CompleteVerificationRequestDto
} from '../data/adapters/rest-api/auth.dto.js';

type AuthFlowStep = 
  | 'idle' 
  | 'loading' 
  | 'requires_2fa' 
  | 'requires_password_change' 
  | 'requires_password_setup' // Handled by email invites typically
  | 'requires_verification' 
  | 'success' 
  | 'error';

export function useAuthFlow() {
  const [step, setStep] = useState<AuthFlowStep>('idle');
  const [authData, setAuthData] = useState<{ identifier?: string; preAuthToken?: string; setupToken?: string }>({});
  const [error, setError] = useState<Error | null>(null);
  
  const { mutateAsync: login } = useLogin();
  const { mutateAsync: verifyMfa } = useVerifyMfa();
  const { mutateAsync: changePassword } = useChangeTemporaryPassword();
  const { mutateAsync: setupPassword } = useSetupPassword();
  const { mutateAsync: verifyEmail } = useVerifyEmail();
  const { mutateAsync: resendToken } = useResendSetupToken();
  const { setToken } = useAuthStore();

  const handleAuthResult = (response: { type: string; preAuthToken?: string; identifier?: string; tokens?: { accessToken: string; accessExpiresAt: string } }) => {
    if (response.type === 'requires_2fa') {
      setAuthData(prev => ({ ...prev, preAuthToken: response.preAuthToken }));
      setStep('requires_2fa');
    } else if (response.type === 'requires_password_change') {
      setAuthData(prev => ({ ...prev, identifier: response.identifier }));
      setStep('requires_password_change');
    } else if (response.type === 'success' && response.tokens) {
      setToken(response.tokens.accessToken, response.tokens.accessExpiresAt);
      setStep('success');
    }
  };

  const submitLogin = async (credentials: LoginRequestDto) => {
    setStep('loading');
    setError(null);
    try {
      const response = await login(credentials);
      handleAuthResult(response);
    } catch (error: unknown) {
      const err = error as Error & { errorCode?: string };
      if (err.errorCode === 'ACCOUNT_UNVERIFIED' || err.name === 'AccountUnverifiedError') {
         setAuthData({ identifier: credentials.identifier });
         setStep('requires_verification');
      } else {
         setError(error instanceof Error ? error : new Error(String(error)));
         setStep('error');
      }
    }
  };

  const submitMfa = async (code: string) => {
     if (!authData.preAuthToken) return;
     setStep('loading');
     setError(null);
     try {
       const tokens = await verifyMfa({ preAuthToken: authData.preAuthToken, code });
       setToken(tokens.accessToken, tokens.accessExpiresAt);
       setStep('success');
     } catch (error: unknown) {
       setError(error instanceof Error ? error : new Error(String(error)));
       setStep('error');
     }
  };

  const submitPasswordChange = async (payload: ChangeTemporaryPasswordRequestDto) => {
     setStep('loading');
     setError(null);
     try {
       const response = await changePassword(payload);
       handleAuthResult(response);
     } catch (error: unknown) {
       setError(error instanceof Error ? error : new Error(String(error)));
       setStep('error');
     }
  };

  const submitPasswordSetup = async (payload: SetupPasswordRequestDto) => {
     setStep('loading');
     setError(null);
     try {
       const response = await setupPassword(payload);
       handleAuthResult(response);
     } catch (error: unknown) {
       setError(error instanceof Error ? error : new Error(String(error)));
       setStep('error');
     }
  };

  const submitEmailVerification = async (payload: CompleteVerificationRequestDto) => {
     setStep('loading');
     setError(null);
     try {
       await verifyEmail(payload);
       // Usually verification succeeds and returns empty, redirect to login
       setStep('idle');
     } catch (error: unknown) {
       setError(error instanceof Error ? error : new Error(String(error)));
       setStep('error');
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

  // Entry point for an invite link that drops the user into the app with a token
  const initializeSetupFlow = (setupToken: string) => {
      setAuthData({ setupToken });
      setStep('requires_password_setup');
  };
  
  return { 
    step, 
    error, 
    authData, 
    setStep,
    initializeSetupFlow,
    submitLogin, 
    submitMfa,
    submitPasswordChange,
    submitPasswordSetup,
    submitEmailVerification,
    resendSetupEmail
  };
}
