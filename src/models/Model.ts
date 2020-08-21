import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  //pass-through methods (immediatly invokes methods in other class)
  //accesssor (getter)
  get on() {
    //returns the reference to the on method in Eventing, not calling it
    //you can use by calling user.on("change", .....callback)
    return this.events.on;
  }

  //accesssor (getter)
  get trigger() {
    return this.events.trigger;
  }

  //accesssor (getter)
  get get() {
    return this.attributes.get;
  }

  set(update: T): void {
    this.attributes.set(update);
    //user info has change, probably want to modify some HTML
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.attributes.get("id");

    if (typeof id !== "number") throw new Error("Cannot fetch without and id");

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse) => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
