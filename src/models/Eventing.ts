type Callback = () => void;

export class Eventing {
  events: { [key: string]: Callback[] } = {};

  //registers an event handler with this user object
  on(eventName: string, callback: Callback) {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  //trigger event to alert other parts of app something has changed
  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach((callback) => {
      callback();
    });
  }
}
