export class UserAccountId {
    private constructor(private readonly value: string) {}
    static of(value: string) {
      if (!value || !value.trim()) throw new Error('UserAccountId required');
      return new UserAccountId(value);
    }
    toString() { return this.value; }
  }
  