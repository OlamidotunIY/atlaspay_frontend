type EventHandler<T> = (event: T) => void;

export class EventBus {
    private listeners: Map<string, Set<EventHandler<unknown>>> = new Map();

    public getListeners() {
        return this.listeners;
    }
}