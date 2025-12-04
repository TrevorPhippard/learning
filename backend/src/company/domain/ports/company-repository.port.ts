import { Company } from "../entities/company.entity";
import { CompanyId } from "../value-objects/company-id.vo";

export interface CompanyRepository {
  save(company: Company): Promise<void>;
  findById(id: CompanyId): Promise<Company | null>;
  findAll(limit?: number): Promise<Company[]>;
}

export const COMPANY_REPOSITORY = Symbol("COMPANY_REPOSITORY");
