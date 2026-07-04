import { BasePacketModel, C, D, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @D() MoveType: number;
  @D() Location: Location;
}

export default class ChangeWaitType extends GameClientPacket {
  ObjectId!: number;
  MoveType!: number;
  Location!: Location;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);
    this.ObjectId = packetData.ObjectId;
    this.MoveType = packetData.MoveType;
    this.Location = packetData.Location;

    return true;
  }
}
