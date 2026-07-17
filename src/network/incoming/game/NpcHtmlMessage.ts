import { BasePacketModel, C, D, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() NpcObjectId: number;
  @S() Html: string;
  @D() ItemId: number;
}

export default class NpcHtmlMessage extends GameClientPacket {
  NpcObjectId: number = 0;
  Html: string = "";
  ItemId: number = 0;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.NpcObjectId = packetData.NpcObjectId;
    this.Html = packetData.Html;
    this.ItemId = packetData.ItemId;

    return true;
  }
}
