type EventHandler = (payload: unknown) => void;

class EventBus {
  private listeners: Map<string, EventHandler[]> = new Map();

  subscribe(event: string, handler: EventHandler): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(handler);
    
    return () => this.unsubscribe(event, handler);
  }

  unsubscribe(event: string, handler: EventHandler) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      this.listeners.set(event, handlers.filter(h => h !== handler));
    }
  }

  publish(event: string, payload: unknown) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.forEach(h => h(payload));
    }
  }
}

export const eventBus = new EventBus();
