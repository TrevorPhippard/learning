import { SkillId } from "../value-objects/skill-id.vo";
import { SkillName } from "../value-objects/skill-name.vo";

export class Skill {
  constructor(
    public readonly id: SkillId,
    public readonly name: SkillName,
    public readonly endorsements: number = 0
  ) {}

  endorse(): Skill {
    return new Skill(this.id, this.name, this.endorsements + 1);
  }
}
