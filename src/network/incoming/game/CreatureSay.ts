import { BasePacketModel, C, D, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @D() Type: number;
  @S() CharName: string; // or readD() ???
  @D() NpcStringId: number;
}

export default class CreatureSay extends GameClientPacket {
  ObjectId = 0;
  Type = 0;
  CharName = "";
  NpcStringId = 0;
  Messages: string[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;
    this.Type = packetData.Type;
    this.CharName = packetData.CharName;
    this.NpcStringId = packetData.NpcStringId;

    while (this._offset + 2 < this._buffer.byteLength) {
      this.Messages.push(this.readS());
    }

    return true;
  }
}
