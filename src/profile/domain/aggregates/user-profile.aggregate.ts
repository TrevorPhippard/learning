import { ProfileId } from "../value-objects/profile-id.vo";
import { UserAccountId } from "../value-objects/user-account-id.vo";
import { FullName } from "../value-objects/full-name.vo";
import { Headline } from "../value-objects/headline.vo";
import { Summary } from "../value-objects/summary.vo";
import { Location } from "../value-objects/location.vo";
import { ImageUrl } from "../value-objects/image-url.vo";
import { Skill } from "../entities/skill.entity";
import { Experience } from "../entities/experience.entity";
import { Education } from "../entities/education.entity";
import { Certification } from "../entities/certification.entity";
import { SkillId } from "../value-objects/skill-id.vo";

export class UserProfile {
  private _skills: Skill[] = [];
  private _experiences: Experience[] = [];
  private _educations: Education[] = [];
  private _certifications: Certification[] = [];

  private constructor(
    public readonly id: ProfileId,
    public readonly userAccountId: UserAccountId,
    public fullName: FullName,
    public headline?: Headline,
    public summary?: Summary,
    public location?: Location,
    public profileImage?: ImageUrl,
    public bannerImage?: ImageUrl,
    public readonly createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  static create(params: {
    id: ProfileId;
    userAccountId: UserAccountId;
    fullName: FullName;
    headline?: Headline;
    summary?: Summary;
    location?: Location;
    profileImage?: ImageUrl;
    bannerImage?: ImageUrl;
  }) {
    return new UserProfile(
      params.id,
      params.userAccountId,
      params.fullName,
      params.headline,
      params.summary,
      params.location,
      params.profileImage,
      params.bannerImage,
      new Date(),
      new Date()
    );
  }

  get skills() {
    return [...this._skills];
  }
  get experiences() {
    return [...this._experiences].sort((a, b) => a.order - b.order);
  }
  get educations() {
    return [...this._educations].sort((a, b) => a.order - b.order);
  }
  get certifications() {
    return [...this._certifications];
  }

  addSkill(skill: Skill) {
    if (this._skills.find((s) => s.id.toString() === skill.id.toString()))
      throw new Error("Skill already exists");
    this._skills.push(skill);
    this.touch();
  }

  endorseSkill(skillId: SkillId) {
    const idx = this._skills.findIndex(
      (s) => s.id.toString() === skillId.toString()
    );
    if (idx === -1) throw new Error("Skill not found");
    const skill = this._skills[idx];
    this._skills[idx] = skill.endorse();
    this.touch();
  }

  removeSkill(skillId: SkillId) {
    this._skills = this._skills.filter(
      (s) => s.id.toString() !== skillId.toString()
    );
    this.touch();
  }

  addExperience(exp: Experience) {
    if (this._experiences.find((e) => e.id.toString() === exp.id.toString()))
      throw new Error("Experience already exists");
    const order = this._experiences.length;
    this._experiences.push(exp.withOrder(order));
    this.touch();
  }

  reorderExperience(id: string, newIndex: number) {
    const idx = this._experiences.findIndex((e) => e.id.toString() === id);
    if (idx === -1) throw new Error("Experience not found");
    const [item] = this._experiences.splice(idx, 1);
    this._experiences.splice(newIndex, 0, item);
    // reassign orders
    this._experiences = this._experiences.map((e, i) => e.withOrder(i));
    this.touch();
  }

  addEducation(edu: Education) {
    if (this._educations.find((e) => e.id.toString() === edu.id.toString()))
      throw new Error("Education already exists");
    const order = this._educations.length;
    this._educations.push(edu.withOrder(order));
    this.touch();
  }

  addCertification(cert: Certification) {
    if (
      this._certifications.find((c) => c.id.toString() === cert.id.toString())
    )
      throw new Error("Certification already exists");
    this._certifications.push(cert);
    this.touch();
  }

  updateHeadline(headline?: Headline) {
    this.headline = headline;
    this.touch();
  }
  updateSummary(summary?: Summary) {
    this.summary = summary;
    this.touch();
  }
  updateLocation(location?: Location) {
    this.location = location;
    this.touch();
  }
  updateProfileImage(image?: ImageUrl) {
    this.profileImage = image;
    this.touch();
  }
  updateBannerImage(image?: ImageUrl) {
    this.bannerImage = image;
    this.touch();
  }
  updateFullName(fullName: FullName) {
    this.fullName = fullName;
    this.touch();
  }

  private touch() {
    this.updatedAt = new Date();
  }
}
