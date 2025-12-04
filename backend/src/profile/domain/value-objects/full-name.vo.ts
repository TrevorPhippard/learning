export class FullName {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {
    if (!firstName || !firstName.trim())
      throw new Error("firstName is required");
    if (!lastName || !lastName.trim()) throw new Error("lastName is required");
  }
  get display() {
    return `${this.firstName} ${this.lastName}`;
  }
}
