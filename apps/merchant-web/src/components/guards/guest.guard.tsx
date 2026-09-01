import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@org/authentication';
import { SplashScreen } from '@org/design-system';

export function GuestGuard({ children, fallback }: { children: React.ReactNode; fallback: string }) {
  const isHydrated = useAuthStore(state => state.isHydrated);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated());

  if (!isHydrated) {
    return <SplashScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to={fallback} replace />;
  }
  return <>{children}</>;
}
