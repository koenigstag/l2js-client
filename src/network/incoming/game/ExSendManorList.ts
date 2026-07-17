import { BasePacketModel, C, D, H, S, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class CastleEntryModel extends BasePacketModel {
  @D() _residenceId: number;
  @S() _castleName: string;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() _castlesSize: number;
  @ArrayModel(CastleEntryModel, "_castlesSize") _castles: CastleEntryModel[];
}

export default class ExSendManorList extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
