import { BasePacketModel, C, D, NestedModel } from "../../GamePacketModel";
import AbstractMessagePacket, { MessagePacketModel } from "./AbstractMessagePacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @NestedModel(MessagePacketModel)
  messagePacket: MessagePacketModel;
  @D() Time: number;
  @D() RequesterId: number;
}

export default class ConfirmDlg extends AbstractMessagePacket {
  Time!: number;
  RequesterId!: number;
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.setData(packetData.messagePacket);

    this.Time = packetData.Time;
    this.RequesterId = packetData.RequesterId;

    return true;
  }
}
