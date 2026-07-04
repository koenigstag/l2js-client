import { BasePacketModel, C, NestedModel } from "../../GamePacketModel";
import AbstractMessagePacket, { MessagePacketModel } from "./AbstractMessagePacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;

  @NestedModel(MessagePacketModel)
  messagePacket: MessagePacketModel;
}

export default class SystemMessage extends AbstractMessagePacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.setData(packetData.messagePacket);

    return true;
  }
}
