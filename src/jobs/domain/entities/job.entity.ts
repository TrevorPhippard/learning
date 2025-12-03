import { JobId } from '../value-objects/job-id.vo';
import { UserId } from '../value-objects/user-id.vo';
import { CompanyId } from '../value-objects/company-id.vo';

export class Job {
  constructor(
    public readonly id: JobId,
    public readonly authorId: UserId,
    public companyId: CompanyId | null,
    public title: string,
    public description: string,
    public location?: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  updateTitle(newTitle: string) { this.title = newTitle; this.touch(); }
  updateDescription(newDesc: string) { this.description = newDesc; this.touch(); }
  updateLocation(newLocation: string) { this.location = newLocation; this.touch(); }
  private touch() { this.updatedAt = new Date(); }
}
