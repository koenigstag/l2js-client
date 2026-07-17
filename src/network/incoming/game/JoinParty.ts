import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _response: number;
}

export default class JoinParty extends GameClientPacket {
  private _response = 0;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this._response = packetData._response;

    return true;
  }
}
