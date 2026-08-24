import { eventBus } from "./event-bus.js";
import { WsEventType, WsMessage } from "./event-types.js";

export function createEventRouter() {
  return function handleRawMessage(raw: string): void {
    try {
      const message = JSON.parse(raw) as WsMessage<unknown>;
      
      // Verify if the message has a type we care about
      if (!message.type || !Object.values(WsEventType).includes(message.type as WsEventType)) {
        console.warn('[WS Router] Unhandled or unknown event type:', message.type);
        return;
      }
      
      // Publish to EventBus
      eventBus.publish(message.type as WsEventType, message.payload);
    } catch {
      console.error('[WS Router] Failed to parse message:', raw);
    }
  };
}