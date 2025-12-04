export class SkillId {
  private constructor(private readonly value: string) {}
  static of(value: string) {
    if (!value || !value.trim()) throw new Error("SkillId required");
    return new SkillId(value);
  }
  toString() {
    return this.value;
  }
}
