import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() CharObjectId: number;
  @D() Heading: number;
}

export default class ExRotation extends GameClientPacket {
  CharObjectId!: number;
  Heading!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.CharObjectId = packetData.CharObjectId;
    this.Heading = packetData.Heading;

    return true;
  }
}
