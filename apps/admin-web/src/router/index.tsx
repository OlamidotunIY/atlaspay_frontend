import { createHashRouter, Navigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@org/shared';

import { AuthLayout } from '../components/layouts/auth.layout.js';
import { DashboardLayout } from '../components/layouts/dashboard.layout.js';
import { AuthGuard } from '../components/guards/auth.guard.js';
import { GuestGuard } from '../components/guards/guest.guard.js';

import { LoginPage } from '../pages/auth/login.page.js';
import { SignupPage } from '../pages/auth/signup.page.js';
import { OverviewPage } from '../pages/dashboard/overview.page.js';

export const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to={ADMIN_ROUTES.LOGIN} replace />
  },
  {
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: ADMIN_ROUTES.LOGIN,
        element: <LoginPage />
      },
      {
        path: ADMIN_ROUTES.SIGNUP,
        element: <SignupPage />
      }
    ]
  },
  {
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: ADMIN_ROUTES.DASHBOARD,
        element: <OverviewPage />
      }
    ]
  },
  {
    path: '*',
    element: <div className="p-8">404 Not Found</div>
  }
]);
