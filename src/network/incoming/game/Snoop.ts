import { BasePacketModel, C, D, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _convoId: number;
  @S() _name: string;
  @D() _unkn1: number;
  @D() _type: number;
  @S() _speaker: string;
  @S() _msg: string;
}

export default class Snoop extends GameClientPacket {
  private _convoId = 0;
  private _name = "";
  private _type = 0;
  private _speaker = "";
  private _msg = "";

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this._convoId = packetData._convoId;
    this._name = packetData._name;
    this._type = packetData._type;
    this._speaker = packetData._speaker;
    this._msg = packetData._msg;

    return true;
  }
}
