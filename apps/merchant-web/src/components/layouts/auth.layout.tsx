import { Outlet } from 'react-router-dom';
import { AuthSplitLayout } from '@org/shell';

export function AuthLayout()
{
  return (
    <AuthSplitLayout imageUrl="/auth-image.png">
      <Outlet />
    </AuthSplitLayout>
  );
}
