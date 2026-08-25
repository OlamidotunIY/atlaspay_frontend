import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

export interface TokenStorage {
  setTokens(accessToken: string, refreshToken: string): Promise<void> | void;
  clearTokens(): Promise<void> | void;
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
  setTokens: (accessToken: string, refreshToken: string, expiresAt: string) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  jti: null,
  setTokens: (accessToken: string, refreshToken: string, expiresAt: string) => {
    try {
      const decoded = jwtDecode<{ jti?: string }>(accessToken);
      set({ accessToken, refreshToken, expiresAt, jti: decoded.jti ?? null });
      if (globalStorageAdapter) {
        globalStorageAdapter.setTokens(accessToken, refreshToken);
      }
    } catch (e) {
      console.error('Failed to decode JWT token', e);
      set({ accessToken, refreshToken, expiresAt, jti: null });
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
}));
