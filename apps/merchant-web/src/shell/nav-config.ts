import { LayoutDashboard, CreditCard, ArrowLeftRight, Building2, Users, Settings, ShoppingBag, Truck } from 'lucide-react';
import { MERCHANT_ROUTES } from '@org/shared';
import type { ShellConfig } from '@org/shell';

export const merchantShellConfig: ShellConfig = {
  variant: 'merchant',
  coreNav: {
    items: [
      { title: 'Overview', href: MERCHANT_ROUTES.DASHBOARD, icon: LayoutDashboard },
      { title: 'Team', href: MERCHANT_ROUTES.TEAM, icon: Users },
      { title: 'Settings', href: MERCHANT_ROUTES.SETTINGS, icon: Settings },
    ],
  },
  products: [
    {
      productKey: 'PAY',
      label: 'AtlasPay',
      icon: CreditCard,
      color: '#164cfd',
      isActive: true, // Auto-provisioned for all orgs
      lockedLabel: 'Inactive',
      items: [
        { title: 'Overview', href: '/atlas-pay', icon: LayoutDashboard },
        { title: 'Transactions', href: '/atlas-pay/transactions', icon: ArrowLeftRight },
        { title: 'Accounts', href: '/atlas-pay/accounts', icon: Building2 },
      ],
    },
    {
      productKey: 'COMMERCE',
      label: 'Commerce',
      icon: ShoppingBag,
      color: '#f59e0b',
      isActive: false, // Locked for now
      lockedLabel: 'Coming Soon',
      items: [],
    },
    {
      productKey: 'LOGISTICS',
      label: 'Logistics',
      icon: Truck,
      color: '#10b981',
      isActive: false, // Locked for now
      lockedLabel: 'Coming Soon',
      items: [],
    },
  ],
};
