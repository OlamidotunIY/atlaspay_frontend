import { WsEventType } from '../event-types.js';

export abstract class WsEventHandler<TPayload = unknown> {
  abstract readonly eventType: WsEventType;
  abstract register(): () => void;
  abstract handle(payload: TPayload): void;
}
