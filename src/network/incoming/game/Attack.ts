import { BasePacketModel, C, D, ArrayModel, H, Loc, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class SubjectModel extends BasePacketModel {
  @D() _targetId: number;
  @D() _damage: number;
  @C() _flags: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;

  @D() AttackerObjectId: number;

  @D() _targetId: number;
  @D() _damage: number;
  @C() _flags: number;

  @Loc() attackerLoc: Location;

  @H() _hitSize: number;

  @ArrayModel(SubjectModel, "_hitSize")
  _subjects: SubjectModel[];

  @Loc() targetLoc: Location;
}

export default class Attack extends GameClientPacket {
  AttackerObjectId = 0;
  Subjects: number[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.AttackerObjectId = packetData.AttackerObjectId;

    this.Subjects.push(packetData._targetId);

    packetData._subjects.forEach((subject) => {
      const _targetId1 = subject._targetId;
      this.Subjects.push(_targetId1);
    });

    return true;
  }
}
