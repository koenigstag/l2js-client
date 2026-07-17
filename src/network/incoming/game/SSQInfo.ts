import { BasePacketModel, C, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H({ transform: (value: number) => value - 256 }) _skyState: number; // Sky color state
}

export default class SSQInfo extends GameClientPacket {
  private _skyState!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this._skyState = packetData._skyState;

    return true;
  }
}
