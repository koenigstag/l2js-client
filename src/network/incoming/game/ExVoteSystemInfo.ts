import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() RecommLeft: number;
  @D() RecommHave: number;
  @D() _recoBonusTime: number;
  @D() _recoBonusVal: number;
  @D() _recoBonusType: number;
}

export default class ExVoteSystemInfo extends GameClientPacket {
  RecommLeft!: number;
  RecommHave!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.RecommLeft = packetData.RecommLeft;
    this.RecommHave = packetData.RecommHave;

    return true;
  }
}
