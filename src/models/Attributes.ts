export class Attributes<T> {
  constructor(private data: T) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  //updates info about the user
  set(updateProps: T): void {
    Object.assign(this.data, updateProps);
  }
}
