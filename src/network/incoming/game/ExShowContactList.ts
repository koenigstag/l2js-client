import { BasePacketModel, C, D, H, ScalarArray } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() _contacts: number;
  @ScalarArray("S", "_contacts") _names: string[];
}

export default class ExShowContactList extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
