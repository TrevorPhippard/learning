import { EducationId } from "../value-objects/education-id.vo";
import { DateRange } from "../value-objects/date-range.vo";

export class Education {
  constructor(
    public readonly id: EducationId,
    public readonly school: string,
    public readonly degree?: string,
    public readonly fieldOfStudy?: string,
    public readonly dateRange?: DateRange,
    public readonly order: number = 0
  ) {
    if (!school || !school.trim()) throw new Error("school required");
  }

  withOrder(order: number) {
    return new Education(
      this.id,
      this.school,
      this.degree,
      this.fieldOfStudy,
      this.dateRange,
      order
    );
  }
}
