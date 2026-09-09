'use client';

import * as React from 'react';
import { NavLink, useLocation } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '../ui/sidebar.js';
import { Badge } from '../ui/badge.js';
import { SidebarOrgHeader } from './sidebar-org-header.js';
import { SidebarUserFooter } from './sidebar-user-footer.js';
import type { ShellConfig } from '../../types/navigation.js';

interface AppSidebarProps {
  config: ShellConfig;
  orgName: string;
  orgLogoUrl?: string;
  userName: string;
  userEmail: string;
  userAvatarUrl?: string;
  onLogout: () => void;
}

export function AppSidebar({
  config,
  orgName,
  orgLogoUrl,
  userName,
  userEmail,
  userAvatarUrl,
  onLogout,
}: AppSidebarProps) {
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <Sidebar>
      {/* Org identity */}
      <SidebarHeader>
        <SidebarOrgHeader name={orgName} logoUrl={orgLogoUrl} />
      </SidebarHeader>

      <SidebarContent>
        {/* Core nav (Overview, Team, Settings) */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {config.coreNav.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.title}>
                    <NavLink to={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Product nav groups */}
        {config.products.map((product) => (
          <SidebarGroup key={product.productKey}>
            <SidebarGroupLabel className="flex items-center justify-between">
              <span>{product.label}</span>
              {!product.isActive && product.lockedLabel && (
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {product.lockedLabel}
                </Badge>
              )}
            </SidebarGroupLabel>

            {product.isActive && product.items.length > 0 && (
              <SidebarGroupContent>
                <SidebarMenu>
                  {product.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.title}>
                        <NavLink to={item.href}>
                          <item.icon />
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge variant="outline" className="ml-auto text-[10px] px-1.5 py-0">
                              {item.badge}
                            </Badge>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarUserFooter
          name={userName}
          email={userEmail}
          avatarUrl={userAvatarUrl}
          onLogout={onLogout}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
