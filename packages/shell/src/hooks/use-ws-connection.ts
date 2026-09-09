import { useEffect } from 'react';
import {
  getGlobalApiClient,
  wsConnection,
  createEventRouter,
  requestWsTicket,
  buildAuthenticatedWsUrl,
  setupQueryCacheSync,
} from '@org/data';

const WS_BASE_URL = (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL ?? 'http://localhost:8080';

/**
 * Boots the WS connection once at shell mount.
 *
 * - Fetches a short-lived ticket via the already-initialised API client
 * - Connects STOMP over WebSocket
 * - Registers all domain handlers (cache updates via setupQueryCacheSync)
 * - Disconnects and cleans up handlers on unmount
 */
export function useWsConnection() {
  useEffect(() => {
    let cleanupSync: (() => void) | null = null;

    const apiClient = getGlobalApiClient();

    requestWsTicket(apiClient)
      .then((ticket) => {
        const url = buildAuthenticatedWsUrl(WS_BASE_URL, ticket);
        wsConnection.onMessage = createEventRouter();
        wsConnection.connect(url);
        cleanupSync = setupQueryCacheSync();
      })
      .catch((err: unknown) => {
        console.warn('[Shell] WS ticket request failed:', err);
      });

    return () => {
      wsConnection.disconnect();
      cleanupSync?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
