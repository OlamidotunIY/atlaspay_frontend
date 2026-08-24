import { ApiClient } from './api-client.js';

let globalApiClient: ApiClient | null = null;

export const setGlobalApiClient = (client: ApiClient) => {
  globalApiClient = client;
};

export const getGlobalApiClient = (): ApiClient => {
  if (!globalApiClient) {
    throw new Error('API Client not initialized. Call setGlobalApiClient first.');
  }
  return globalApiClient;
};

export * from './api-client.js';
export * from './errors/index.js';
export * from './interceptor/index.js';