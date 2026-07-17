import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
}

export default class Revive extends GameClientPacket {
  ObjectId!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;

    return true;
  }
}
