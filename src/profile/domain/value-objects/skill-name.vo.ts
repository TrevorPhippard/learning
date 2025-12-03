export class SkillName {
  constructor(public readonly value: string) {
    if (!value || !value.trim()) throw new Error("SkillName required");
    if (value.length > 100) throw new Error("SkillName max 100 chars");
  }
}
