import { ProfileRepository } from "../../domain/ports/profile.repository.port";
import { UserProfile } from "../../domain/aggregates/user-profile.aggregate";
import { ProfileId } from "../../domain/value-objects/profile-id.vo";
import { db } from "../drizzle/db";
import { profiles, skills, experiences } from "../drizzle/schema";
import { eq, ilike, or } from "drizzle-orm";

export class DrizzleProfileRepository implements ProfileRepository {
  async save(profile: UserProfile): Promise<void> {
    const p = {
      id: profile.id.toString(),
      user_account_id: profile.userAccountId.toString(),
      full_name: profile.fullName.display,
      headline: profile.headline ? (profile.headline as any).value : null,
      summary: profile.summary ? (profile.summary as any).text : null,
      profile_image: profile.profileImage
        ? (profile.profileImage as any).url
        : null,
      banner_image: profile.bannerImage
        ? (profile.bannerImage as any).url
        : null,
    };

    await db
      .insert(profiles)
      .values(p)
      .onConflictDoUpdate({
        target: profiles.id,
        set: {
          full_name: p.full_name,
          headline: p.headline,
          summary: p.summary,
          profile_image: p.profile_image,
          banner_image: p.banner_image,
          updated_at: new Date(),
        },
      });

    // Replace skills
    await db.delete(skills).where(eq(skills.profile_id, profile.id.toString()));

    if (profile.skills.length) {
      const skillRows = profile.skills.map((s) => ({
        id: s.id.toString(),
        profile_id: profile.id.toString(),
        name: s.name.value,
        endorsements: String(s.endorsements),
      }));
      await db.insert(skills).values(skillRows);
    }

    // Replace experiences
    await db
      .delete(experiences)
      .where(eq(experiences.profile_id, profile.id.toString()));

    if (profile.experiences.length) {
      const expRows = profile.experiences.map((e) => ({
        id: e.id.toString(),
        profile_id: profile.id.toString(),
        company_name: e.companyName,
        title: e.title,
        start_date: e.dateRange.start,
        end_date: e.dateRange.end ?? null,
        description: e.description ?? null,
        ord: String(e.order),
      }));
      await db.insert(experiences).values(expRows); // FIXED
    }
  }

  private async mapRowToProfile(row: any): Promise<UserProfile> {
    const {
      id,
      user_account_id,
      full_name,
      headline,
      summary,
      profile_image,
      banner_image,
    } = row;

    const [firstName = ""] = full_name.split(" ");
    const lastName = full_name.replace(firstName, "").trim() || " ";

    const { UserProfile: UserProfileClass } =
      await import("../../domain/aggregates/user-profile.aggregate.js");
    const { FullName: FullNameClass } =
      await import("../../domain/value-objects/full-name.vo.js");
    const { UserAccountId } =
      await import("../../domain/value-objects/user-account-id.vo.js");

    const profile = UserProfileClass.create({
      id: ProfileId.of(id),
      userAccountId: UserAccountId.of(user_account_id),
      fullName: new FullNameClass(firstName, lastName),
      headline: headline ? ({ value: headline } as any) : undefined,
      summary: summary ? ({ text: summary } as any) : undefined,
      profileImage: profile_image ? ({ url: profile_image } as any) : undefined,
      bannerImage: banner_image ? ({ url: banner_image } as any) : undefined,
    });

    // Load skills
    const skillRows = await db
      .select()
      .from(skills)
      .where(eq(skills.profile_id, id));
    for (const s of skillRows) {
      const { Skill } = await import("../../domain/entities/skill.entity.js");
      const { SkillId } =
        await import("../../domain/value-objects/skill-id.vo.js");
      const { SkillName } =
        await import("../../domain/value-objects/skill-name.vo.js");

      profile.addSkill(
        new Skill(
          SkillId.of(s.id),
          new SkillName(s.name),
          Number(s.endorsements)
        )
      );
    }

    // Load experiences
    const expRows = await db
      .select()
      .from(experiences)
      .where(eq(experiences.profile_id, id));
    expRows.sort((a: any, b: any) => Number(a.ord) - Number(b.ord));

    for (const e of expRows) {
      const { Experience } =
        await import("../../domain/entities/experience.entity.js");
      const { ExperienceId } =
        await import("../../domain/value-objects/experience-id.vo.js");
      const { DateRange } =
        await import("../../domain/value-objects/date-range.vo.js");

      const dateRange = new DateRange(
        new Date(e.start_date),
        e.end_date ? new Date(e.end_date) : undefined
      );

      profile.addExperience(
        new Experience(
          ExperienceId.of(e.id),
          e.company_name,
          e.title,
          dateRange,
          e.description ? ({ text: e.description } as any) : undefined,
          Number(e.ord)
        )
      );
    }

    return profile; // FIXED: moved outside loop
  }

  async findById(id: ProfileId): Promise<UserProfile | null> {
    const rows = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, id.toString()))
      .limit(1);
    if (!rows?.length) return null;
    return this.mapRowToProfile(rows[0]);
  }

  async findByUserAccountId(userAccountId: any): Promise<UserProfile | null> {
    const rows = await db
      .select()
      .from(profiles)
      .where(eq(profiles.user_account_id, userAccountId.toString()))
      .limit(1);

    if (!rows?.length) return null;
    return this.mapRowToProfile(rows[0]); // FIXED
  }

  async searchByNameOrHeadline(
    term: string,
    limit = 20
  ): Promise<UserProfile[]> {
    const rows = await db
      .select()
      .from(profiles)
      .where(
        or(
          ilike(profiles.full_name, `%${term}%`),
          ilike(profiles.headline, `%${term}%`)
        )
      )
      .limit(limit);

    const results: UserProfile[] = [];
    for (const r of rows) results.push(await this.mapRowToProfile(r));
    return results;
  }

  async endorseSkill(profileId: ProfileId, skillId: any): Promise<void> {
    const rows = await db
      .select()
      .from(skills)
      .where(eq(skills.id, skillId.toString()))
      .limit(1);
    if (!rows.length) throw new Error("Skill not found");

    const skill = rows[0];
    const newCount = Number(skill.endorsements || 0) + 1;

    await db
      .update(skills)
      .set({ endorsements: String(newCount) })
      .where(eq(skills.id, skillId.toString()));
  }
}
