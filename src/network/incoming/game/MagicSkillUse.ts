import { BasePacketModel, C, D, H, Loc, Location, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class GroundLocationModel extends BasePacketModel {
  @Loc() _loc: Location;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;

  @D() ActiveCharObjId: number;
  @D() TargetObjId: number;

  @D() SkillId: number;
  @D() SkillLevel: number;
  @D() HitTime: number;
  @D() ReuseDelay: number;
  @Loc() _casterLoc: Location;

  @H() _type: number;
  @H() _groundLocationsCount: number;
  @ArrayModel(GroundLocationModel, "_groundLocationsCount") _groundLocations: GroundLocationModel[];

  @Loc() _targetLoc: Location;
}

export default class MagicSkillUse extends GameClientPacket {
  ActiveCharObjId!: number;
  TargetObjId!: number;
  SkillId!: number;
  SkillLevel!: number;
  HitTime!: number;
  ReuseDelay!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ActiveCharObjId = packetData.ActiveCharObjId;
    this.TargetObjId = packetData.TargetObjId;
    this.SkillId = packetData.SkillId;
    this.SkillLevel = packetData.SkillLevel;
    this.HitTime = packetData.HitTime;
    this.ReuseDelay = packetData.ReuseDelay;

    return true;
  }
}
