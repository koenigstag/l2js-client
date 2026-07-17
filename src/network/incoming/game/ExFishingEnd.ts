import { transformIs1 } from "../../../utils";
import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() ObjectId: number;
  @C(transformIs1) IsWin: boolean;
}

export default class ExFishingEnd extends GameClientPacket {
  ObjectId!: number;
  IsWin!: boolean;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;
    this.IsWin = packetData.IsWin;

    return true;
  }
}
