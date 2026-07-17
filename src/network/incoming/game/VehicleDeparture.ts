import { BasePacketModel, C, D, Loc, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _objId: number;
  @D() _moveSpeed: number;
  @D() _rotationSpeed: number;
  @Loc() _location: Location;
}

export default class VehicleDeparture extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
