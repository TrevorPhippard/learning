export class EducationId {
  private constructor(private readonly value: string) {}
  static of(value: string) {
    if (!value || !value.trim()) throw new Error("EducationId required");
    return new EducationId(value);
  }
  toString() {
    return this.value;
  }
}
