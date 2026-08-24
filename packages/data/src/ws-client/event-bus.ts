import { WsEventType } from "./event-types.js";

export type EventHandler<T> = (event: T) => void;

export class EventBus {
    private listeners: Map<WsEventType, Set<EventHandler<any>>> = new Map();

    subscribe<T>(eventType: WsEventType, handler: EventHandler<T>): () => void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, new Set());
        }
        this.listeners.get(eventType)!.add(handler as EventHandler<any>);
        
        return () => {
            this.listeners.get(eventType)?.delete(handler as EventHandler<any>);
        };
    }

    publish<T>(eventType: WsEventType, payload: T): void {
        const handlers = this.listeners.get(eventType);
        if (handlers) {
            for (const handler of handlers) {
                try {
                    handler(payload);
                } catch (err) {
                    console.error(`[EventBus] Error in handler for ${eventType}:`, err);
                }
            }
        }
    }

    clear(): void {
        this.listeners.clear();
    }
}

export const eventBus = new EventBus();