import { Outlet } from 'react-router-dom';
import { AuthSplitLayout } from '@org/design-system';

export function AuthLayout()
{
  const adminBranding = (
    <div>
      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        {/* <GalleryVerticalEnd className="size-4" /> */}
      </div>
      Atlaspay Admin
    </div>
  );

  return (
    <AuthSplitLayout brandingSlot={adminBranding}>
      <Outlet />
    </AuthSplitLayout>
  );
}
