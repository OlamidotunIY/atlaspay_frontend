import type { LucideIcon } from 'lucide-react';

export type ProductKey = 'PAY' | 'COMMERCE' | 'LOGISTICS' | 'HR' | 'ACCOUNTING';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface ProductNavConfig {
  /** Matches backend ProductKey enum exactly */
  productKey: ProductKey;
  label: string;
  icon: LucideIcon;
  /** Brand colour for the product chip */
  color: string;
  /** Whether this org has an active subscription for this product */
  isActive: boolean;
  /** Label shown when not active */
  lockedLabel?: string;
  items: NavItem[];
}

export interface CoreNavConfig {
  items: NavItem[];
}

export interface ShellConfig {
  variant: 'merchant' | 'admin';
  coreNav: CoreNavConfig;
  products: ProductNavConfig[];
}
