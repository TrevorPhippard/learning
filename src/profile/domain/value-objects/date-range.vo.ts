export class DateRange {
  constructor(
    public readonly start: Date,
    public readonly end?: Date
  ) {
    if (!(start instanceof Date) || isNaN(start.getTime()))
      throw new Error("Invalid start date");
    if (end !== undefined && (!(end instanceof Date) || isNaN(end.getTime())))
      throw new Error("Invalid end date");
    if (end && start > end) throw new Error("DateRange start must be <= end");
  }
}
