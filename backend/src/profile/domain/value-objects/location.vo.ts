export class Location {
  constructor(
    public readonly city?: string,
    public readonly region?: string,
    public readonly country?: string
  ) {
    if (city === "" || region === "" || country === "")
      throw new Error("Location parts must not be empty strings");
  }
  toString() {
    const parts = [this.city, this.region, this.country].filter(Boolean);
    return parts.join(", ");
  }
}
