import { Outlet } from 'react-router-dom';
import { AuthSplitLayout } from '@org/design-system';

export function AuthLayout()
{
  return (
    <AuthSplitLayout imageUrl="/auth-image.png">
      <Outlet />
    </AuthSplitLayout>
  );
}
