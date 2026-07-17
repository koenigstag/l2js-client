import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() CharObjectId: number;
  @D() Degree: number;
  @D() Side: number;
  @D() Speed: number;
}

export default class StartRotation extends GameClientPacket {
  CharObjectId!: number;
  Degree!: number;
  Side!: number;
  Speed!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.CharObjectId = packetData.CharObjectId;
    this.Degree = packetData.Degree;
    this.Side = packetData.Side;
    this.Speed = packetData.Speed;

    return true;
  }
}
