import { ExperienceId } from '../value-objects/experience-id.vo';
import { DateRange } from '../value-objects/date-range.vo';

export class Experience {
  constructor(
    public readonly id: ExperienceId,
    public readonly companyName: string,
    public readonly title: string,
    public readonly dateRange: DateRange,
    public readonly description?: string,
    public readonly order: number = 0
  ) {
    if (!companyName || !companyName.trim()) throw new Error('companyName required');
    if (!title || !title.trim()) throw new Error('title required');
  }

  withOrder(order: number) {
    return new Experience(this.id, this.companyName, this.title, this.dateRange, this.description, order);
  }
}
