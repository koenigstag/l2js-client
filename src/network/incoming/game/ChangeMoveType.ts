import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _charObjId: number;

  @D({ transform: (value: number) => value === ChangeMoveType.RUN }) _running: boolean;

  @D() _pad1: number;
}

export default class ChangeMoveType extends GameClientPacket {
  static readonly WALK: number = 0;
  static readonly RUN: number = 1;
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
