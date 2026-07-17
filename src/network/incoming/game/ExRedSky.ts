import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() _duration: number;
}

export default class ExRedSky extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
