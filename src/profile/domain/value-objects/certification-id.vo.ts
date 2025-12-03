export class CertificationId {
    private constructor(private readonly value: string) {}
    static of(value: string) { if (!value || !value.trim()) throw new Error('CertificationId required'); return new CertificationId(value); }
    toString() { return this.value; }
  }
  