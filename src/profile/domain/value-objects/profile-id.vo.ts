export class ProfileId {
    private constructor(private readonly value: string) {}
    static of(value: string) {
      if (!value || !value.trim()) throw new Error('ProfileId required');
      return new ProfileId(value);
    }
    toString() { return this.value; }
  }
  