import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { AxiosResponse } from "axios";

//interface to describe a user's properties
export interface UserProps {
  // ? makes these properties optional
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }

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

  set(update: UserProps): void {
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
}
