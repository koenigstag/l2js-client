import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() CharObjectId: number;
  @D() Degree: number;
  @D() Speed: number;
  @D() _pad: number;
}

export default class StopRotation extends GameClientPacket {
  CharObjectId!: number;
  Degree!: number;
  Speed!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.CharObjectId = packetData.CharObjectId;
    this.Degree = packetData.Degree;
    this.Speed = packetData.Speed;

    return true;
  }
}
