import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export interface TokenStorage {
  setTokens(accessToken: string, refreshToken: string): Promise<void> | void;
  clearTokens(): Promise<void> | void;
  getTokens(): { accessToken: string | null; refreshToken: string | null } | Promise<{ accessToken: string | null; refreshToken: string | null }>;
}

// Global injection point for the platform-specific storage adapter
let globalStorageAdapter: TokenStorage | null = null;

export const setAuthStorageAdapter = (adapter: TokenStorage) => {
  globalStorageAdapter = adapter;
};

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  jti: string | null;
  isHydrated: boolean;
  setTokens: (accessToken: string, refreshToken: string, expiresAt?: string) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  jti: null,
  isHydrated: false,
  setTokens: (accessToken: string, refreshToken: string, expiresAt?: string) => {
    try {
      const decoded = jwtDecode<{ jti?: string }>(accessToken);
      set({ accessToken, refreshToken, expiresAt: expiresAt ?? null, jti: decoded.jti ?? null });
      if (globalStorageAdapter) {
        globalStorageAdapter.setTokens(accessToken, refreshToken);
      }
    } catch (e) {
      console.error('Failed to decode JWT token', e);
      set({ accessToken, refreshToken, expiresAt: expiresAt ?? null, jti: null });
      if (globalStorageAdapter) {
        globalStorageAdapter.setTokens(accessToken, refreshToken);
      }
    }
  },
  clear: () => {
    set({ accessToken: null, refreshToken: null, expiresAt: null, jti: null });
    if (globalStorageAdapter) {
      globalStorageAdapter.clearTokens();
    }
  },
  isAuthenticated: () => !!get().accessToken,
  hydrate: async () => {
    if (globalStorageAdapter) {
      const tokens = await globalStorageAdapter.getTokens();
      if (tokens.accessToken) {
        try {
          const decoded = jwtDecode<{ jti?: string }>(tokens.accessToken);
          set({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, jti: decoded.jti ?? null, isHydrated: true });
          return;
        } catch (e) {
          console.error('Failed to decode JWT token during hydration', e);
          set({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, isHydrated: true });
          return;
        }
      }
    }
    set({ isHydrated: true });
  }
}));
