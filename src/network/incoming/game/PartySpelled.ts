import { BasePacketModel, C, D, H, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";
import L2Buff from "../../../entities/L2Buff";

class BuffModel extends BasePacketModel {
  @D() _skillId: number;
  @H() _skillLevel: number;
  @D() _skillTime: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _charType: number;
  @D() PartyMemberObjectId: number;
  @D() _size: number;
  @ArrayModel(BuffModel, "_size") _buffs: BuffModel[];
}

export default class PartySpelled extends GameClientPacket {
  PartyMemberObjectId!: number;
  PartyMemberBuffs: L2Buff[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.PartyMemberObjectId = packetData.PartyMemberObjectId;

    packetData._buffs.forEach((buff) => {
      this.PartyMemberBuffs.push(new L2Buff(buff._skillId, buff._skillLevel));
    });

    return true;
  }
}
