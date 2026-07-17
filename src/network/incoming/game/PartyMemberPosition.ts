import { BasePacketModel, C, D, Loc, Location, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class MemberPositionModel extends BasePacketModel {
  @D() _objId: number;
  @Loc() _location: Location;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _size: number;
  @ArrayModel(MemberPositionModel, "_size") _members: MemberPositionModel[];
}

export default class PartyMemberPosition extends GameClientPacket {
  Members: Record<number, number[]> = {};

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    packetData._members.forEach((member) => {
      this.Members[member._objId] = member._location;
    });

    return true;
  }
}
