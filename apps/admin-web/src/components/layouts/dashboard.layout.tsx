import { Outlet } from 'react-router-dom';
import { useSessionManager } from '@org/authentication';
import { DashboardLayoutShell } from '@org/design-system';

export function DashboardLayout() {
  useSessionManager(); // Boot session manager tracking

  const adminSidebar = (
    <div className="p-6 h-full flex flex-col bg-slate-900">
      <div className="flex items-center gap-2 font-medium text-white mb-8 tracking-tight text-xl">
        <div className="flex size-7 items-center justify-center rounded-md overflow-hidden">
          <img src="/icon.png" alt="Atlaspay Logo" className="w-full h-full object-cover" />
        </div>
        Atlaspay Admin
      </div>
      
      <nav className="flex-1 space-y-2">
         {/* Admin specific navigation links go here */}
         <div className="text-sm font-medium text-slate-300 p-2 rounded hover:bg-slate-800 cursor-pointer">
            Overview
         </div>
         <div className="text-sm font-medium text-slate-300 p-2 rounded hover:bg-slate-800 cursor-pointer">
            Merchants
         </div>
      </nav>
      
      <div className="text-xs text-slate-500 mt-auto">Admin Portal v1.0</div>
    </div>
  );

  const adminHeader = (
    <div className="w-full flex justify-between items-center">
      <div className="font-medium text-slate-600">Global Infrastructure Overview</div>
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
          A
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayoutShell 
      sidebarSlot={adminSidebar} 
      headerSlot={adminHeader}
    >
      <Outlet />
    </DashboardLayoutShell>
  );
}
