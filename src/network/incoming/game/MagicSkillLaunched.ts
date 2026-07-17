import { BasePacketModel, C, D, ScalarArray } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _charObjId: number;
  @D() _skillId: number;
  @D() _skillLevel: number;
  @D() _targetsNum: number;
  @ScalarArray("D", "_targetsNum") _targets: number[];
}

export default class MagicSkillLaunched extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
