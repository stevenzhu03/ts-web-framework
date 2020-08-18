export class Attributes<T> {
  constructor(private data: T) {}

  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }

  //updates info about the user
  set(updateProps: T): void {
    Object.assign(this.data, updateProps);
  }
}
