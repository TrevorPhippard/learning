export class CommentId {
    private constructor(private readonly value: string) {}
    static of(value: string) { if (!value || !value.trim()) throw new Error('CommentId required'); return new CommentId(value); }
    toString() { return this.value; }
  }
  