import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @C() _paused: number; // state 0 - pause 1 - started
  @D() _time: number; // left time in ms max is 16000 its 4m and state is automatically changed to quit
}

export default class ExNevitAdventTimeChange extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
