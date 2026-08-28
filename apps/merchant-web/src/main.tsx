import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { setGlobalRouter } from '@org/shared';
import { setAuthStorageAdapter } from '@org/authentication';
import { setGlobalApiClient, createApiClient } from '@org/data';

import '@org/design-system/styles/globals.css';

import { router } from './router/index.js';
import { cookieStorageAdapter } from './lib/adapters/cookie-storage.adapter.js';
import App from './app/app.js';

setGlobalRouter({
  push: (path) => router.navigate(path),
  replace: (path) => router.navigate(path, { replace: true }),
  goBack: () => router.navigate(-1),
});

setAuthStorageAdapter(cookieStorageAdapter);
setGlobalApiClient(createApiClient());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
