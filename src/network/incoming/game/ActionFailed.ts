import { BasePacketModel, C } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
}

export default class ActionFailed extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const data = this.readModel(PacketModel);

    return true;
  }
}
