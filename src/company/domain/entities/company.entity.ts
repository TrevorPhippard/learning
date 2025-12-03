import { CompanyId } from "../value-objects/company-id.vo";

export class Company {
  constructor(
    public readonly id: CompanyId,
    public name: string,
    public description?: string,
    public website?: string,
    public industry?: string,
    public location?: string,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  updateName(name: string) {
    this.name = name;
    this.touch();
  }
  updateDescription(description: string) {
    this.description = description;
    this.touch();
  }
  updateWebsite(website: string) {
    this.website = website;
    this.touch();
  }
  updateIndustry(industry: string) {
    this.industry = industry;
    this.touch();
  }
  updateLocation(location: string) {
    this.location = location;
    this.touch();
  }
  private touch() {
    this.updatedAt = new Date();
  }
}
