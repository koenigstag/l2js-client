import { BasePacketModel, C, D, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";
import L2Skill from "../../../entities/L2Skill";

class SkillEntryModel extends BasePacketModel {
  @D({ transform: (value: number) => value === 0 }) IsActive: boolean; // 1 - passive
  @D() Level: number;
  @D() Id: number;
  @C({ transform: (value: number) => value === 1 }) _disabled: boolean;
  @C({ transform: (value: number) => value === 1 }) IsEnchanted: boolean;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _skillsSize: number;
  @ArrayModel(SkillEntryModel, "_skillsSize") _skills: SkillEntryModel[];
}

export default class SkillList extends GameClientPacket {
  Skills: L2Skill[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    packetData._skills.forEach((entry) => {
      const skill = new L2Skill();
      skill.IsActive = entry.IsActive;
      skill.Level = entry.Level;
      skill.Id = entry.Id;
      skill.IsEnchanted = entry.IsEnchanted;

      this.Skills.push(skill);
    });

    return true;
  }
}
