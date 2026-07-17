import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() CreatureObjId: number;
  @H() _color: number;
  @D() _pad: number;
}

export default class MyTargetSelected extends GameClientPacket {
  CreatureObjId!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.CreatureObjId = packetData.CreatureObjId;

    return true;
  }
}
