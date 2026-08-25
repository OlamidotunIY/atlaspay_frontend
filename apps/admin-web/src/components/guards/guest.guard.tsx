import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@org/authentication';
import { ADMIN_ROUTES } from '@org/shared';

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());

  if (isAuthenticated) {
    return <Navigate to={ADMIN_ROUTES.DASHBOARD} replace />;
  }
  return <>{children}</>;
}
