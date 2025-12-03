import { Job } from '../entities/job.entity';
import { JobId } from '../value-objects/job-id.vo';
import { UserId } from '../value-objects/user-id.vo';

export interface JobRepository {
  save(job: Job): Promise<void>;
  findById(id: JobId): Promise<Job | null>;
  findByAuthor(authorId: UserId, limit?: number): Promise<Job[]>;
}

export const JOB_REPOSITORY = Symbol('JOB_REPOSITORY');
