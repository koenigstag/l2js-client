import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _num: number;
}

export default class TradeDone extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
