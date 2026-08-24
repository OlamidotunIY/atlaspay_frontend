import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  accessToken: string | null;
  expiresAt: string | null;
  jti: string | null;
  setToken: (token: string, expiresAt: string) => void;
  clear: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  accessToken: null,
  expiresAt: null,
  jti: null,
  setToken: (token: string, expiresAt: string) => {
    try {
      const decoded = jwtDecode<{ jti?: string }>(token);
      set({ accessToken: token, expiresAt, jti: decoded.jti ?? null });
    } catch (e) {
      console.error('Failed to decode JWT token', e);
      set({ accessToken: token, expiresAt, jti: null });
    }
  },
  clear: () => set({ accessToken: null, expiresAt: null, jti: null }),
  isAuthenticated: () => !!get().accessToken,
}));
