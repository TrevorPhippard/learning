import { randomUUID } from "crypto";

export class SessionId {
  private readonly value: string;

  constructor(id?: string) {
    if (id && !SessionId.isValidUUID(id)) {
      throw new Error("Invalid SessionId: must be a valid UUID");
    }

    this.value = id ?? randomUUID();
  }

  static isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }

  toString(): string {
    return this.value;
  }

  equals(other: SessionId): boolean {
    return this.value === other.value;
  }
}
