import { View } from "./View";
import { User, UserProps } from "../models/User";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
            <div>
                <h1>User Form</h1>
                <div>User name: ${this.model.get("name")}</div>
                <div>User age: ${this.model.get("age")}</div>
                <input/>
                <button class="set-name">Change Name</button>
                <button class="set-age">Set Random Age</button>
                <button class="save-model">Save</button>
            </div>
        `;
  }
}
