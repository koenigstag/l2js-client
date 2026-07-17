import { BasePacketModel, C, D, Loc, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @Loc() Destination: Location;
  @Loc() Location: Location;
}

export default class MoveToLocation extends GameClientPacket {
  ObjectId!: number;
  Destination!: number[];
  Location!: number[];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;
    this.Destination = packetData.Destination;
    this.Location = packetData.Location;

    return true;
  }
}
