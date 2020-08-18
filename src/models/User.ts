import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

//interface to describe a user's properties
export interface UserProps {
  // ? makes these properties optional
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  constructor(private data: UserProps) {}
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>();

  //gets info for the user
  get(propName: string): number | string {
    return this.data[propName];
  }

  //updates info about the user
  set(updateProps: UserProps): void {
    Object.assign(this.data, updateProps);
  }
}
