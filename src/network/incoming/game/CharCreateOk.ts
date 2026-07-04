import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() result: number;
}

export default class CharCreateOk extends GameClientPacket {
  result!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);
    this.result = packetData.result;

    return true;
  }
}
