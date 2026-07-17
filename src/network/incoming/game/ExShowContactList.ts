import { BasePacketModel, C, D, H, S, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class ContactNameModel extends BasePacketModel {
  @S() _name: string;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() _contacts: number;
  @ArrayModel(ContactNameModel, "_contacts") _names: ContactNameModel[];
}

export default class ExShowContactList extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
