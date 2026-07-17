import { BasePacketModel, C, D, Loc, Location } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _objId: number;
  @Loc() _location: Location;
  @D() _heading: number;
}

export default class VehicleCheckLocation extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
