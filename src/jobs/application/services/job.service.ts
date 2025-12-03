import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import {
  JobRepository,
  JOB_REPOSITORY,
} from "../../domain/ports/job-repository.port";
import { JobId } from "../../domain/value-objects/job-id.vo";
import { UserId } from "../../domain/value-objects/user-id.vo";
import { CompanyId } from "../../domain/value-objects/company-id.vo";
import { Job } from "../../domain/entities/job.entity";
import { CreateJobDto } from "../dtos/create-job.dto";

@Injectable()
export class JobService {
  constructor(
    @Inject(JOB_REPOSITORY)
    private readonly repo: JobRepository
  ) {}

  async create(dto: CreateJobDto) {
    const job = new Job(
      JobId.of(uuidv4()),
      UserId.of(dto.authorId),
      dto.companyId ? CompanyId.of(dto.companyId) : null,
      dto.title,
      dto.description,
      dto.location
    );
    await this.repo.save(job);
    return job;
  }

  async getById(id: string) {
    return this.repo.findById(JobId.of(id));
  }

  async findByAuthor(authorId: string, limit = 20) {
    return this.repo.findByAuthor(UserId.of(authorId), limit);
  }

  async updateJob(
    id: string,
    title?: string,
    description?: string,
    location?: string
  ) {
    const job = await this.repo.findById(JobId.of(id));
    if (!job) throw new Error("Job not found");
    if (title) job.updateTitle(title);
    if (description) job.updateDescription(description);
    if (location) job.updateLocation(location);
    await this.repo.save(job);
    return job;
  }
}
