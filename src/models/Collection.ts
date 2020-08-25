import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

//T is the type, K is the type is structure of json data we are getting back from fetch
export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  //for deserialize we pass in json data we get from fetch and deserialize to get the instance of models
  constructor(public rootURL: string, public deserialize: (json: K) => T) {}

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootURL).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.models.push(this.deserialize(value));
      });
    });
  }
}
