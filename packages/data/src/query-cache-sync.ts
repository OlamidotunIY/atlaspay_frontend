import { BalanceUpdatedHandler } from './ws-client/handlers/balance-updated.handler.js';

/**
 * setupQueryCacheSync — registers all WS event handlers that keep the
 * React Query cache in sync with real-time backend events.
 *
 * Each handler lives in ws-client/handlers/<domain>-<event>.handler.ts and is
 * responsible for its own query keys. Handlers update the cache in-place where
 * possible, and fall back to invalidation when the payload is insufficient.
 *
 * Call once after the WS connection is established (in the shell's
 * useWsConnection hook). Returns a cleanup fn that unsubscribes all handlers.
 *
 * To add a new domain event:
 *  1. Create ws-client/handlers/<domain>-<event>.handler.ts
 *  2. Instantiate and add it to the `handlers` array below.
 */
export function setupQueryCacheSync(): () => void {
  const handlers = [
    new BalanceUpdatedHandler(),
    // new LedgerUpdatedHandler(),      ← add as you build out AtlasPay
    // new SubscriptionUpdatedHandler(),← add when billing WS events land
    // new VirtualAccountIssuedHandler(),
  ];

  const unsubs = handlers.map((h) => h.register());
  return () => unsubs.forEach((u) => u());
}