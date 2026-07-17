import { BasePacketModel, C, D, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class BuffEntryModel extends BasePacketModel {
  @D() _skillId: number;
  @D() _skillLvl: number;
  @D() _reuse: number;
  @D() _remaining: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _cnt: number;
  @ArrayModel(BuffEntryModel, "_cnt") _buffs: BuffEntryModel[];
}

export default class SkillCoolTime extends GameClientPacket {
  BuffsList: {
    id: number;
    lvl: number;
    reuse: number;
    remaining: number;
  }[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    packetData._buffs.forEach((buff) => {
      this.BuffsList.push({
        id: buff._skillId,
        lvl: buff._skillLvl,
        reuse: buff._reuse,
        remaining: buff._remaining,
      });
    });

    return true;
  }
}
