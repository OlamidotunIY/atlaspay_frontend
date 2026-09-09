import * as React from 'react';
import { Outlet } from 'react-router';

/**
 * FullPageShell — no sidebar. Used for pages like Marketplace that need
 * full-width canvas. Header is minimal (just branding + user actions).
 */
export function FullPageShell({
  userName,
  onLogout,
}: {
  userName: string;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <img src="/icon.png" alt="AtlasHub" className="size-6" />
          AtlasHub
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{userName}</span>
          <button
            onClick={onLogout}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
