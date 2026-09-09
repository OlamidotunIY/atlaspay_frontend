import * as React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../ui/sidebar.js';
import { AppSidebar } from '../sidebar/app-sidebar.js';
import { Separator } from '@/components/ui/separator.js';
import { Outlet } from 'react-router';
import type { ShellConfig } from '../../types/navigation.js';

interface AppShellProps {
  config: ShellConfig;
  orgName: string;
  orgLogoUrl?: string;
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  onLogout: () => void;
}

export function AppShell({
  config,
  orgName,
  orgLogoUrl,
  userName,
  userEmail,
  userAvatarUrl,
  onLogout,
}: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar
        config={config}
        orgName={orgName}
        orgLogoUrl={orgLogoUrl}
        userName={userName}
        userEmail={userEmail}
        userAvatarUrl={userAvatarUrl}
        onLogout={onLogout}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {/* Breadcrumbs injected via context or portal in the future */}
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
