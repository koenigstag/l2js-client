import { BasePacketModel, C, D, Loc, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @Loc() Location: Location;
  @D() Heading: number;
}

export default class StopMove extends GameClientPacket {
  ObjectId!: number;
  Heading!: number;
  Location!: number[];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;
    this.Location = packetData.Location;
    this.Heading = packetData.Heading;

    return true;
  }
}
