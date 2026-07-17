import { BasePacketModel, C, D, H, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() NpcObjectId: number;
  @S() Html: string;
  @D() QuestId: number;
}

export default class NpcQuestHtmlMessage extends GameClientPacket {
  NpcObjectId: number = 0;
  Html: string = "";
  QuestId: number = 0;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.NpcObjectId = packetData.NpcObjectId;
    this.Html = packetData.Html;
    this.QuestId = packetData.QuestId;

    return true;
  }
}
