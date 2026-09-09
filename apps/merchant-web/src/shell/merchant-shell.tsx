
import { AppShell } from '@org/shell';
import { merchantShellConfig } from './nav-config.js';
import { useAuthStore } from '@org/authentication';
import { useOrganizationProfile } from '@org/organization';

export function MerchantShell() {
  const { user, actions } = useAuthStore();
  const { data: orgProfile } = useOrganizationProfile();

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <AppShell
      config={merchantShellConfig}
      orgName={orgProfile?.businessName || 'My Organization'}
      orgLogoUrl={orgProfile?.logoUrl}
      userName={`${user?.firstName || ''} ${user?.lastName || ''}`.trim()}
      userEmail={user?.email || ''}
      onLogout={handleLogout}
    />
  );
}
