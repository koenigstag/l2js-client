import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() CharObjectId: number;
  @D() _color: number;
  @D() CurrentTime: number;
  @D() MaxTime: number;
}

export default class SetupGauge extends GameClientPacket {
  CharObjectId!: number;
  CurrentTime!: number;
  MaxTime!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.CharObjectId = packetData.CharObjectId;
    this.CurrentTime = packetData.CurrentTime;
    this.MaxTime = packetData.MaxTime;

    return true;
  }
}
