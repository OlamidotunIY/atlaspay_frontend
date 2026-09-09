import { queryClient } from '../../query-client/query-client.js';
import { eventBus } from '../event-bus.js';
import { WsEventType } from '../event-types.js';
import { WsEventHandler } from './base.handler.js';

/**
 * BalanceUpdatedPayload — shape broadcast by the backend on
 * billing.balance.updated events. We use it to write directly into the cache.
 */
export interface BalanceUpdatedPayload {
  currency: string;
  amount: number;
}

/**
 * BalanceUpdatedHandler — one job: when a BALANCE_UPDATED WS event arrives,
 * update the React Query cache for ['balance'] in-place so the UI reflects the
 * new balance immediately without a network round-trip.
 *
 * If the backend payload is incomplete we fall back to invalidating the query
 * so it refetches fresh data.
 */
export class BalanceUpdatedHandler implements WsEventHandler<BalanceUpdatedPayload> {
  readonly eventType = WsEventType.BALANCE_UPDATED;

  register(): () => void {
    return eventBus.subscribe<BalanceUpdatedPayload>(
      this.eventType,
      (payload) => this.handle(payload),
    );
  }

  handle(payload: BalanceUpdatedPayload): void {
    if (!payload?.currency) {
      // Payload incomplete — fall back to a background refetch
      void queryClient.invalidateQueries({ queryKey: ['balance'] });
      return;
    }

    // Optimistically update every balance entry that matches this currency
    queryClient.setQueriesData<BalanceUpdatedPayload[]>(
      { queryKey: ['balance'] },
      (prev) => {
        if (!prev) return prev;
        return prev.map((b) =>
          b.currency === payload.currency
            ? { ...b, amount: payload.amount }
            : b,
        );
      },
    );
  }
}
