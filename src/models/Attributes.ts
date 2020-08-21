import { UserProps } from "./User";

export class Attributes<T> {
  constructor(private data: T) {}

  //In TS, strings can be types
  //In JS and TS, all object keys are strings
  //K extends keyof T   (K here is meant to represent key of object)
  //setting up a constraint limiting what K can be, here meaning K can only ever be one of the types of T
  //in UserProps case, K can only be name, age, id

  //key: K
  //we are only passing in the key types available in T

  //T[k] (regular object lookup, look at interface of T and return value corresponding to key)
  //so T[name] = string, T[age] = number, T[id] = number
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  //updates info about the user
  set(updateProps: T): void {
    Object.assign(this.data, updateProps);
  }

  getAll(): T {
    return this.data;
  }
}

const atr = new Attributes<UserProps>({
  id: 5,
  age: 6,
  name: "bobb",
});

const name = atr.get("name");
