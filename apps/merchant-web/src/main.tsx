import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { setGlobalRouter } from '@org/shared';
import { setAuthStorageAdapter, useAuthStore, authRepository } from '@org/authentication';
import { setGlobalApiClient, createApiClient } from '@org/data';

import '@org/shell/styles/globals.css';

import { router } from './router/index.js';
import { cookieStorageAdapter } from './lib/adapters/cookie-storage.adapter.js';
import App from './app/app.js';

setGlobalRouter({
  push: (path) => router.navigate(path),
  replace: (path) => router.navigate(path, { replace: true }),
  goBack: () => router.navigate(-1),
});

setAuthStorageAdapter(cookieStorageAdapter);

// Configure the global API client with auth interceptor callbacks
setGlobalApiClient(createApiClient({
  getToken: () => useAuthStore.getState().accessToken,
  onTokenRefresh: async () => {
    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) throw new Error('No refresh token available');
    
    try {
      const tokens = await authRepository.refreshToken(refreshToken);
      useAuthStore.getState().setTokens(tokens.accessToken, tokens.refreshToken, tokens.accessExpiresAt);
      return tokens.accessToken;
    } catch (error) {
      useAuthStore.getState().clear();
      throw error;
    }
  }
}));

// Hydrate auth state from cookies before the app fully mounts
useAuthStore.getState().hydrate();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
