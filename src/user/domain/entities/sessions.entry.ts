import { UserId } from "../value-objects/user-id.vo";
import { SessionId } from "../value-objects/session-id.vo"; // You will need this VO
// import { RefreshToken } from "../value-objects/refresh-token.vo"; // Optional suggestion

export class Session {
  constructor(
    private readonly id: SessionId,
    private readonly user_id: UserId,
    private refresh_token: string,
    private user_agent: string,
    private ip_address: string, // store as text, DB casts to INET
    private expires_at: Date,
    private readonly createdAt: Date,
    private updatedAt: Date
  ) {}

  static create(params: {
    user_id: string | UserId;
    refresh_token: string;
    user_agent: string;
    ip_address: string;
    expires_at: Date;
  }): Session {
    if (!params.refresh_token) {
      throw new Error("Refresh token cannot be empty");
    }

    return new Session(
      new SessionId(),
      params.user_id instanceof UserId
        ? params.user_id
        : new UserId(params.user_id),
      params.refresh_token,
      params.user_agent || "",
      params.ip_address || "",
      params.expires_at,
      new Date(),
      new Date()
    );
  }

  getId(): SessionId {
    return this.id;
  }

  getUserId(): UserId {
    return this.user_id;
  }

  getRefreshToken(): string {
    return this.refresh_token;
  }

  getUserAgent(): string {
    return this.user_agent;
  }

  getIpAddress(): string {
    return this.ip_address;
  }

  getExpiresAt(): Date {
    return this.expires_at;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateRefreshToken(token: string) {
    if (!token) throw new Error("Refresh token cannot be empty");
    this.refresh_token = token;
    this.updatedAt = new Date();
  }

  updateExpiration(date: Date) {
    this.expires_at = date;
    this.updatedAt = new Date();
  }

  isExpired(): boolean {
    return new Date() > this.expires_at;
  }
}
