export class ExperienceId {
    private constructor(private readonly value: string) {}
    static of(value: string) { if (!value || !value.trim()) throw new Error('ExperienceId required'); return new ExperienceId(value); }
    toString() { return this.value; }
  }
  