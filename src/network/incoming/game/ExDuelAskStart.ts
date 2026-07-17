import { BasePacketModel, C, D, H, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @S() RequestorName: string;
  @D() PartyDuel: number;
}

export default class ExDuelAskStart extends GameClientPacket {
  RequestorName: string = "";
  PartyDuel: number = 0;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.RequestorName = packetData.RequestorName;
    this.PartyDuel = packetData.PartyDuel;

    return true;
  }
}
