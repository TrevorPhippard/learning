export class UserId {
    private constructor(private readonly value: string) {}
    static of(value: string) { if (!value || !value.trim()) throw new Error('UserId required'); return new UserId(value); }
    toString() { return this.value; }
  }
  