import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@org/authentication';

export function GuestGuard({ children, fallback }: { children: React.ReactNode; fallback: string }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());

  if (isAuthenticated) {
    return <Navigate to={fallback} replace />;
  }
  return <>{children}</>;
}
