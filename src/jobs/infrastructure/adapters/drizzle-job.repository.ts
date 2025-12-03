import { JobRepository } from '../../domain/ports/job-repository.port';
import { Job } from '../../domain/entities/job.entity';
import { JobId } from '../../domain/value-objects/job-id.vo';
import { UserId } from '../../domain/value-objects/user-id.vo';

import { db } from '../drizzle/db';
import { jobs } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export class DrizzleJobRepository implements JobRepository {
  async save(job: Job): Promise<void> {
    await db.insert(jobs).values({
      id: job.id.toString(),
      author_id: job.authorId.toString(),
      company_id: job.companyId?.toString() ?? null,
      title: job.title,
      description: job.description,
      location: job.location,
      created_at: job.createdAt,
      updated_at: job.updatedAt
    })
    .onConflictDoUpdate({
      target: jobs.id,
      set: {
        author_id: job.authorId.toString(),
        company_id: job.companyId?.toString() ?? null,
        title: job.title,
        description: job.description,
        location: job.location,
        updated_at: new Date()
      }
    });
  }

  private mapRow(row: any): Job {
    const { Job } = require('../../domain/entities/job.entity');
    const { JobId } = require('../../domain/value-objects/job-id.vo');
    const { UserId } = require('../../domain/value-objects/user-id.vo');

    return new Job(
      JobId.of(row.id),
      UserId.of(row.author_id),
      row.company_id ?? null,
      row.title,
      row.description,
      row.location ?? null,
      row.created_at,
      row.updated_at
    );
  }

  async findById(id: JobId): Promise<Job | null> {
    const rows = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, id.toString()));

    if (rows.length === 0) return null;
    return this.mapRow(rows[0]);
  }

  async findAll(limit = 20): Promise<Job[]> {
    const rows = await db
      .select()
      .from(jobs)
      .limit(limit);

    return rows.map((row) => this.mapRow(row));
  }
  
  async findByAuthor(authorId: UserId, limit = 20): Promise<Job[]> {
    const rows = await db
      .select()
      .from(jobs)
      .where(eq(jobs.author_id, authorId.toString()))
      .limit(limit);

    return rows.map((row) => this.mapRow(row));
  }
}
