import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@org/authentication';
import { ADMIN_ROUTES } from '@org/shared';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ADMIN_ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
