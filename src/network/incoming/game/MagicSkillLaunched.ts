import { BasePacketModel, C, D, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class TargetIdModel extends BasePacketModel {
  @D() _targetId: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _charObjId: number;
  @D() _skillId: number;
  @D() _skillLevel: number;
  @D() _targetsNum: number;
  @ArrayModel(TargetIdModel, "_targetsNum") _targets: TargetIdModel[];
}

export default class MagicSkillLaunched extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
