import { Inject, Injectable } from "@nestjs/common";
import { ProfileId } from "../../domain/value-objects/profile-id.vo";
import { UserAccountId } from "../../domain/value-objects/user-account-id.vo";
import { FullName } from "../../domain/value-objects/full-name.vo";
import { CreateProfileDto } from "../dtos/create-profile.dto";
import { Skill } from "../../domain/entities/skill.entity";
import { SkillId } from "../../domain/value-objects/skill-id.vo";
import { SkillName } from "../../domain/value-objects/skill-name.vo";
import { v4 as uuidv4 } from "uuid";
import {
  ProfileRepository,
  PROFILE_REPOSITORY,
} from "../../domain/ports/profile.repository.port";
import { UserProfile } from "../../domain/aggregates/user-profile.aggregate";

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly repo: ProfileRepository
  ) {}

  async create(dto: CreateProfileDto) {
    const id = ProfileId.of(uuidv4());
    const userAccountId = UserAccountId.of(dto.userAccountId);
    const fullName = new FullName(dto.firstName, dto.lastName);
    const profile = UserProfile.create({
      id,
      userAccountId,
      fullName,
      headline: dto.headline ? ({ value: dto.headline } as any) : undefined,
      summary: dto.summary ? ({ text: dto.summary } as any) : undefined,
    });
    await this.repo.save(profile);
    return profile;
  }

  async getById(id: string) {
    return this.repo.findById(ProfileId.of(id));
  }

  async addSkill(profileId: string, name: string) {
    const profile = await this.repo.findById(ProfileId.of(profileId));
    if (!profile) throw new Error("Profile not found");
    const skill = new Skill(SkillId.of(uuidv4()), new SkillName(name));
    profile.addSkill(skill);
    await this.repo.save(profile);
    return skill;
  }

  async endorseSkill(profileId: string, skillId: string) {
    await this.repo.endorseSkill(ProfileId.of(profileId), SkillId.of(skillId));
  }

  async reorderExperience(
    profileId: string,
    experienceId: string,
    newIndex: number
  ) {
    const profile = await this.repo.findById(ProfileId.of(profileId));
    if (!profile) throw new Error("Profile not found");
    profile.reorderExperience(experienceId, newIndex);
    await this.repo.save(profile);
  }

  async search(term: string, limit = 20) {
    return this.repo.searchByNameOrHeadline(term, limit);
  }
}
