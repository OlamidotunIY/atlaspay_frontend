import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@org/authentication';

export function AuthGuard({ children, fallback }: { children: React.ReactNode; fallback: string }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
