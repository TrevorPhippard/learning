import { Controller, Post as HttpPost, Body, Get, Param, Patch } from '@nestjs/common';
import { JobService } from '../application/services/job.service';
import { CreateJobDto } from '../application/dtos/create-job.dto';

@Controller('jobs')
export class JobController {
  constructor(private readonly svc: JobService) {}

  @HttpPost()
  async create(@Body() dto: CreateJobDto) {
    return this.svc.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.svc.getById(id);
  }

  @Get('author/:authorId')
  async findByAuthor(@Param('authorId') authorId: string) {
    return this.svc.findByAuthor(authorId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body('title') title?: string, @Body('description') description?: string, @Body('location') location?: string) {
    return this.svc.updateJob(id, title, description, location);
  }
}
