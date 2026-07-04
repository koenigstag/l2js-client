import L2Buff from "../../../entities/L2Buff";
import { BasePacketModel, C, D, H, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class BuffModel extends BasePacketModel implements Pick<L2Buff, "Id" | "SkillLevel" | "RemainingTime"> {
  @D() Id: number;
  @H() SkillLevel: number;
  @D() RemainingTime: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;

  @H() _size: number;

  @ArrayModel(BuffModel, "_size")
  buffs: BuffModel[];
}

export default class AbnormalStatusUpdate extends GameClientPacket {
  AbnormalBuffs: L2Buff[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    for (let i = 0; i < packetData._size; i++) {
      const buffData = packetData.buffs[i];

      const buff = new L2Buff();
      Object.assign(buff, buffData);
      this.AbnormalBuffs.push(buff);
    }

    return true;
  }
}
