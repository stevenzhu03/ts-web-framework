import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { APISync } from "./APISync";
import { Eventing } from "./Eventing";

//interface to describe a user's properties
export interface UserProps {
  // ? makes these properties optional
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  //can create different types of users with more static methods
  static buildUser(attr: UserProps): User {
    return new User(
      new Attributes<UserProps>(attr),
      new Eventing(),
      new APISync<UserProps>(rootUrl)
    );
  }
}
