import { CompanyRepository } from '../../domain/ports/company-repository.port';
import { Company } from '../../domain/entities/company.entity';
import { CompanyId } from '../../domain/value-objects/company-id.vo';
import { db } from '../drizzle/db';
import { companies } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export class DrizzleCompanyRepository implements CompanyRepository {
  async save(company: Company): Promise<void> {
    await db.insert(companies).values({
      id: company.id.toString(),
      name: company.name,
      description: company.description,
      website: company.website,
      industry: company.industry,
      location: company.location,
      created_at: company.createdAt,
      updated_at: company.updatedAt
    }).onConflictDoUpdate({
      target: companies.id,
      set: { name: company.name, description: company.description, website: company.website, industry: company.industry, location: company.location, updated_at: new Date() }
    });
  }

  private mapRow(row: any): Company {
    const { Company } = require('../../domain/entities/company.entity');
    const { CompanyId } = require('../../domain/value-objects/company-id.vo');
    return new Company(CompanyId.of(row.id), row.name, row.description, row.website, row.industry, row.location, row.created_at, row.updated_at);
  }

  async findById(id: CompanyId): Promise<Company | null> {
    const row = await db.select().from(companies).where(eq(companies.id, id.toString()));
    if (!row) return null;
    return this.mapRow(row);
  }

  async findAll(limit = 20): Promise<Company[]> {
    const rows = await db.select().from(companies).limit(limit);
    return rows.map(this.mapRow);
  }
}
