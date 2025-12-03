export class CompanyId {
  private constructor(private readonly value: string) {}
  static of(value: string) {
    if (!value || !value.trim()) throw new Error("CompanyId required");
    return new CompanyId(value);
  }
  toString() {
    return this.value;
  }
}
