import { BasePacketModel, C, D, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() MemberObjId: number;
  @S() _memberName: string;
}

export default class PartySmallWindowDelete extends GameClientPacket {
  MemberObjId!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.MemberObjId = packetData.MemberObjId;

    return true;
  }
}
