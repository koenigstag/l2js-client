import { BasePacketModel, C, H, S, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PlayerNameModel extends BasePacketModel {
  @S() _name: string;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _players: number;
  @ArrayModel(PlayerNameModel, "_players") _playerNames: PlayerNameModel[];
}

export default class PlayerInGame extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
