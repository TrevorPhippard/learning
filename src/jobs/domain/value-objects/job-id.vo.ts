export class JobId {
  private constructor(private readonly value: string) {}
  static of(value: string) {
    if (!value || !value.trim()) throw new Error("JobId required");
    return new JobId(value);
  }
  toString() {
    return this.value;
  }
}
