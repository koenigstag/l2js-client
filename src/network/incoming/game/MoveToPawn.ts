import { BasePacketModel, C, D, Loc, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() CharObjId: number;
  @D() TargetObjId: number;
  @D() Distance: number;
  @Loc() Location: Location;
  @Loc() Destination: Location;
}

export default class MoveToPawn extends GameClientPacket {
  CharObjId!: number;
  TargetObjId!: number;
  Distance!: number;
  Location!: number[];
  Destination!: number[];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.CharObjId = packetData.CharObjId;
    this.TargetObjId = packetData.TargetObjId;
    this.Distance = packetData.Distance;
    this.Location = packetData.Location;
    this.Destination = packetData.Destination;

    return true;
  }
}
