import { BasePacketModel, C, D, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class RelationEntryModel extends BasePacketModel {
  @D() _relationObjId: number;
  @D() _relationRel: number;
  @D() _relationAutoAttackable: number;
  @D() _relationKarma: number;
  @D() _relationPvpFlag: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _size: number;
  @ArrayModel(RelationEntryModel, "_size") _entries: RelationEntryModel[];
}

export default class RelationChanged extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
