import { transformIs1 } from "../../../utils";
import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() CharObjId: number;
  @D(transformIs1) _canTeleport: boolean;

  @D() _hideOutId: number;
  @D() _toCastle: number;
  @D() _toSiegeHQ: number;

  @D(transformIs1) Sweepable: boolean; // blue glow
  @D(transformIs1) _staticRes: boolean; // to Fixed

  @D() _toFortress: number;
}

export default class Die extends GameClientPacket {
  CharObjId!: number;
  Sweepable!: boolean;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.CharObjId = packetData.CharObjId;
    this.Sweepable = packetData.Sweepable;

    return true;
  }
}
