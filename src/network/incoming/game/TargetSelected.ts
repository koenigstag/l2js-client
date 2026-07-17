import { BasePacketModel, C, D, Loc, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @D() TargetObjectId: number;
  @Loc() Location: Location;
  @D() _unkn1: number;
}

export default class TargetSelected extends GameClientPacket {
  ObjectId!: number;
  TargetObjectId!: number;
  Location!: number[];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;
    this.TargetObjectId = packetData.TargetObjectId;
    this.Location = packetData.Location;

    return true;
  }
}
