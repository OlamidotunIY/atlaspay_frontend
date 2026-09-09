// ── Shadcn UI primitives ────────────────────────────────────────────────────
export * from './components/ui/avatar.js';
export * from './components/ui/badge.js';
export * from './components/ui/button.js';
export * from './components/ui/card.js';
export * from './components/ui/dialog.js';
export * from './components/ui/dropdown-menu.js';
export * from './components/ui/empty.js';
export * from './components/ui/form.js';
export * from './components/ui/input.js';
export * from './components/ui/input-otp.js';
export * from './components/ui/label.js';
export * from './components/ui/logo.js';
export * from './components/ui/select.js';
export * from './components/ui/separator.js';
export * from './components/ui/sheet.js';
export * from './components/ui/sidebar.js';
export * from './components/ui/skeleton.js';
export * from './components/ui/sonner.js';
export * from './components/ui/spinner.js';
export * from './components/ui/tooltip.js';

// ── Composites ──────────────────────────────────────────────────────────────
export * from './components/composites/auth-form-header.js';
export * from './components/composites/auth-split-layout.js';
export * from './components/composites/empty-state.js';
export * from './components/composites/error-state.js';
export * from './components/composites/splash-screen.js';

// ── Layout shells ───────────────────────────────────────────────────────────
export * from './components/app-shell.js';
export * from './components/full-page-shell.js';

// ── Sidebar composition ─────────────────────────────────────────────────────
export * from './components/sidebar/app-sidebar.js';
export * from './components/sidebar/sidebar-org-header.js';
export * from './components/sidebar/sidebar-user-footer.js';

// ── Navigation types ────────────────────────────────────────────────────────
export type {
  NavItem,
  ProductNavConfig,
  CoreNavConfig,
  ShellConfig,
  ProductKey,
} from './types/navigation.js';

// ── Hooks ───────────────────────────────────────────────────────────────────
export * from './hooks/use-mobile.js';
export * from './hooks/use-ws-connection.js';
