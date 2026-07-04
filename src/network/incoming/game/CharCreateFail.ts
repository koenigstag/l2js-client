import { CharCreateFailReason } from "../../../enums/CharCreateFailReason";
import { BasePacketModel, C } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @C() FailReason: number;
}

export default class CharCreateFail extends GameClientPacket {
  FailReason!: CharCreateFailReason;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);
    this.FailReason = (CharCreateFailReason as any)[packetData.FailReason];

    return true;
  }
}
