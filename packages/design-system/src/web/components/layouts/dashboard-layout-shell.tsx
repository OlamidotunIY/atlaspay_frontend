import * as React from 'react';

export interface DashboardLayoutShellProps {
  sidebarSlot: React.ReactNode;
  headerSlot?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardLayoutShell({ sidebarSlot, headerSlot, children }: DashboardLayoutShellProps) {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
        {sidebarSlot}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Optional Header */}
        {headerSlot && (
          <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 shadow-sm z-10">
            {headerSlot}
          </header>
        )}

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
