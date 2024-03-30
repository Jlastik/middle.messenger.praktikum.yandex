interface IEventBus {}

export class EventBus implements IEventBus {
  listeners: Record<
    string,
    Array<(...props: Record<string, unknown>[]) => void>
  >;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...props: Record<string, unknown>[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: Record<string, unknown>[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    this.listeners[event].forEach((fn) => {
      fn(...args);
    });
  }
}
