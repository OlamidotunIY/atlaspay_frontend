import {
  createHashRouter,
  Navigate,
} from 'react-router';
import { MERCHANT_ROUTES } from '@org/shared';

import { AuthLayout } from '../components/layouts/auth.layout.js';
import { DashboardLayout } from '../components/layouts/dashboard.layout.js';
import { OnboardingLayout } from '../components/layouts/onboarding.layout.js';
import { AuthGuard } from '../components/guards/auth.guard.js';
import { GuestGuard } from '../components/guards/guest.guard.js';

import { LoginPage } from '../pages/auth/login.page.js';
import { SignupPage } from '../pages/auth/signup.page.js';
import { InvitePage } from '../pages/auth/invite.page.js';
import { VerifyEmailPage } from '../pages/auth/verify-email.page.js';
import { SetupPasswordPage } from '../pages/auth/setup-password.page.js';
import { OverviewPage } from '../pages/dashboard/overview.page.js';
import { OrganizationOnboardingPage } from '../pages/onboarding/organization.page.js';
import { ProductsOnboardingPage } from '../pages/onboarding/products.page.js';
import { TeamOnboardingPage } from '../pages/onboarding/team.page.js';
import { CompleteOnboardingPage } from '../pages/onboarding/complete.page.js';

export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to={MERCHANT_ROUTES.LOGIN} replace />
  },
  {
    element: (
      <GuestGuard fallback={MERCHANT_ROUTES.DASHBOARD}>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: MERCHANT_ROUTES.LOGIN,
        element: <LoginPage />
      },
      {
        path: MERCHANT_ROUTES.REGISTRATION,
        element: <SignupPage />
      },
      {
        path: MERCHANT_ROUTES.VERIFY_EMAIL,
        element: <VerifyEmailPage />
      },
      {
        path: MERCHANT_ROUTES.SETUP_PASSWORD,
        element: <SetupPasswordPage />
      },
      {
        path: '/invite/:token',
        element: <InvitePage />
      }
    ]
  },
  {
    element: (
      <AuthGuard fallback={MERCHANT_ROUTES.LOGIN} requireOnboarding={false}>
        <OnboardingLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: MERCHANT_ROUTES.ONBOARDING_ORGANIZATION,
        element: <OrganizationOnboardingPage />
      },
      {
        path: MERCHANT_ROUTES.ONBOARDING_PRODUCTS,
        element: <ProductsOnboardingPage />
      },
      {
        path: MERCHANT_ROUTES.ONBOARDING_TEAM,
        element: <TeamOnboardingPage />
      },
      {
        path: MERCHANT_ROUTES.ONBOARDING_COMPLETE,
        element: <CompleteOnboardingPage />
      }
    ]
  },
  {
    element: (
      <AuthGuard fallback={MERCHANT_ROUTES.LOGIN}>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: MERCHANT_ROUTES.DASHBOARD,
        element: <OverviewPage />
      }
    ]
  },
  {
    path: '*',
    element: <div className="p-8">404 Not Found</div>
  }
]);
