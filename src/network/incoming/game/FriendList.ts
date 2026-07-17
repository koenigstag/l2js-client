import { BasePacketModel, C, D, S, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class FriendEntryModel extends BasePacketModel {
  @D() _objId: number;
  @S() _name: string;
  @D() _online: number; // 0x01 = online
  @D() _objIdIfOnline: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _size: number;
  @ArrayModel(FriendEntryModel, "_size") _friends: FriendEntryModel[];
}

export default class FriendList extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
