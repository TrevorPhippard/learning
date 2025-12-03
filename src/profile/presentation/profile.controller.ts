import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ProfileService } from '../application/services/profile.service';
import { CreateProfileDto } from '../application/dtos/create-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly svc: ProfileService) {}

  @Post()
  async create(@Body() dto: CreateProfileDto) {
    return this.svc.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.svc.getById(id);
  }

  @Post(':id/skills')
  async addSkill(@Param('id') id: string, @Body('name') name: string) {
    return this.svc.addSkill(id, name);
  }

  @Patch(':id/skills/:skillId/endorse')
  async endorse(@Param('id') id: string, @Param('skillId') skillId: string) {
    await this.svc.endorseSkill(id, skillId);
    return { ok: true };
  }

  @Patch(':id/experiences/:expId/reorder')
  async reorderExperience(@Param('id') id: string, @Param('expId') expId: string, @Body('newIndex') newIndex: number) {
    await this.svc.reorderExperience(id, expId, newIndex);
    return { ok: true };
  }

  @Get('search/:term')
  async search(@Param('term') term: string) {
    return this.svc.search(term);
  }
}
