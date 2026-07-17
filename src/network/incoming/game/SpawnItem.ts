import { BasePacketModel, C, D, Q, Loc, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";
import L2DroppedItem from "../../../entities/L2DroppedItem";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @D() Id: number;
  @Loc() Location: Location;
  @D() _isStackable: number;
  @Q() Count: number;
  @D() _unkn1: number;
  @D() _unkn2: number;
}

export default class SpawnItem extends GameClientPacket {
  Item: L2DroppedItem = new L2DroppedItem();

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.Item.ObjectId = packetData.ObjectId;
    this.Item.Id = packetData.Id;
    this.Item.Location = packetData.Location;
    this.Item.Count = packetData.Count;

    return true;
  }
}
