import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _charObjId: number;
  @D() _actionId: number;
}

export default class SocialAction extends GameClientPacket {
  static readonly LEVEL_UP: number = 2122;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
