import { CertificationId } from "../value-objects/certification-id.vo";

export class Certification {
  constructor(
    public readonly id: CertificationId,
    public readonly name: string,
    public readonly issuingOrganization?: string,
    public readonly receivedAt?: Date
  ) {
    if (!name || !name.trim()) throw new Error("certification name required");
  }
}
