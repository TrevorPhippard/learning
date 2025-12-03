import { UserProfile } from '../aggregates/user-profile.aggregate';
import { ProfileId } from '../value-objects/profile-id.vo';
import { UserAccountId } from '../value-objects/user-account-id.vo';
import { SkillId } from '../value-objects/skill-id.vo';

export interface ProfileRepository {
  save(profile: UserProfile): Promise<void>;
  findById(id: ProfileId): Promise<UserProfile | null>;
  findByUserAccountId(userAccountId: UserAccountId): Promise<UserProfile | null>;
  searchByNameOrHeadline(term: string, limit?: number): Promise<UserProfile[]>;
  endorseSkill(profileId: ProfileId, skillId: SkillId): Promise<void>;
}

export const PROFILE_REPOSITORY = Symbol('PROFILE_REPOSITORY');
