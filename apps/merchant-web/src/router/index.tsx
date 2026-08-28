import { createHashRouter, Navigate } from 'react-router-dom';
import { MERCHANT_ROUTES } from '@org/shared';

import { AuthLayout } from '../components/layouts/auth.layout.js';
import { DashboardLayout } from '../components/layouts/dashboard.layout.js';
import { AuthGuard } from '../components/guards/auth.guard.js';
import { GuestGuard } from '../components/guards/guest.guard.js';

import { LoginPage } from '../pages/auth/login.page.js';
import { SignupPage } from '../pages/auth/signup.page.js';
import { InvitePage } from '../pages/auth/invite.page.js';
import { VerifyEmailPage } from '../pages/auth/verify-email.page.js';
import { OverviewPage } from '../pages/dashboard/overview.page.js';

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
        path: '/invite/:token',
        element: <InvitePage />
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
