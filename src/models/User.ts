//interface to describe a user's properties
interface UserProps {
  // ? makes these properties optional
  name?: string;
  age?: number;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  //gets info for the user
  get(propName: string): number | string {
    return this.data[propName];
  }

  //updates info about the user
  set(updateProps: UserProps): void {
    Object.assign(this.data, updateProps);
  }

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
