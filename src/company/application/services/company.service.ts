import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CompanyRepository, COMPANY_REPOSITORY } from '../../domain/ports/company-repository.port';
import { CompanyId } from '../../domain/value-objects/company-id.vo';
import { Company } from '../../domain/entities/company.entity';
import { CreateCompanyDto } from '../dtos/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly repo: CompanyRepository
  ) {}

  async create(dto: CreateCompanyDto) {
    const company = new Company(CompanyId.of(uuidv4()), dto.name, dto.description, dto.website, dto.industry, dto.location);
    await this.repo.save(company);
    return company;
  }

  async getById(id: string) {
    return this.repo.findById(CompanyId.of(id));
  }

  async findAll(limit = 20) {
    return this.repo.findAll(limit);
  }

  async updateCompany(id: string, dto: Partial<CreateCompanyDto>) {
    const company = await this.repo.findById(CompanyId.of(id));
    if (!company) throw new Error('Company not found');
    if (dto.name) company.updateName(dto.name);
    if (dto.description) company.updateDescription(dto.description);
    if (dto.website) company.updateWebsite(dto.website);
    if (dto.industry) company.updateIndustry(dto.industry);
    if (dto.location) company.updateLocation(dto.location);
    await this.repo.save(company);
    return company;
  }
}
