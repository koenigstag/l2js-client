import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @D() _unkn1: number;
}

export default class DeleteObject extends GameClientPacket {
  ObjectId: number;

  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);
    this.ObjectId = packetData.ObjectId;

    return true;
  }
}
