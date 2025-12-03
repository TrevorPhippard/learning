export class PostId {
    private constructor(private readonly value: string) {}
    static of(value: string) { if (!value || !value.trim()) throw new Error('PostId required'); return new PostId(value); }
    toString() { return this.value; }
  }
  