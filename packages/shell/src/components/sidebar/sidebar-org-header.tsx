import * as React from 'react';

interface SidebarOrgHeaderProps {
  name: string;
  logoUrl?: string;
}

export function SidebarOrgHeader({ name, logoUrl }: SidebarOrgHeaderProps) {
  return (
    <div className="flex items-center gap-2.5 px-2 py-1.5">
      <div className="flex size-8 items-center justify-center rounded-lg overflow-hidden bg-primary/10 shrink-0">
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-bold text-primary">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold truncate">{name}</span>
        <span className="text-[11px] text-muted-foreground">Merchant</span>
      </div>
    </div>
  );
}
