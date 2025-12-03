export class RefreshToken {
  private readonly value: string;

  constructor(token: string) {
    if (!token || typeof token !== "string") {
      throw new Error("RefreshToken must be a non-empty string");
    }

    if (token.length < 32) {
      throw new Error("RefreshToken must be at least 32 characters long");
    }

    this.value = token;
  }

  toString(): string {
    return this.value;
  }

  equals(other: RefreshToken): boolean {
    return this.value === other.value;
  }
}
