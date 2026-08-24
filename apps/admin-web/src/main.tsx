import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

import { createApiClient, setGlobalApiClient } from '@org/data';
import { useAuthStore } from '@org/feature-auth'; // Adjust import based on library setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize Global API Client
const apiClient = createApiClient({
  getToken: () => useAuthStore.getState().accessToken || '',
  onTokenRefresh: async () => {
    // Basic refresh setup (use-session-manager handles proactive refresh, this is for 401 fallbacks)
    return ''; 
  }
});
setGlobalApiClient(apiClient);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);

