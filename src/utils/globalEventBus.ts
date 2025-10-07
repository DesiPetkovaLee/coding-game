// Global event bus for React-Phaser communication
type EventCallback = (...args: unknown[]) => void;

class GlobalEventBus {
    private listeners: Map<string, EventCallback[]> = new Map();

    on(event: string, callback: EventCallback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback);
    }

    off(event: string, callback: EventCallback) {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            const index = eventListeners.indexOf(callback);
            if (index > -1) {
                eventListeners.splice(index, 1);
            }
        }
    }

    emit(event: string, ...args: unknown[]) {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            eventListeners.forEach((callback) => callback(...args));
        }
    }
}

// Create a global instance
const globalEventBus = new GlobalEventBus();

// Make it available on window for Phaser to access
if (typeof window !== 'undefined') {
    (
        window as unknown as Window & { globalEventBus: GlobalEventBus }
    ).globalEventBus = globalEventBus;
}

export default globalEventBus;
