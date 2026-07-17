import { BasePacketModel, C, H, ScalarArray } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _players: number;
  @ScalarArray("S", "_players") _playerNames: string[];
}

export default class PlayerInGame extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
