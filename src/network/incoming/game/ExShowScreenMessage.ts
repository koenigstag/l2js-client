import { BasePacketModel, C, D, H, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() _type: number;
  @D() _sysMessageId: number;
  @D() _position: number;
  @D() _unk1: number;
  @D() _size: number;
  @D() _unk2: number;
  @D() _unk3: number;
  @D() _effect: number;
  @D() _time: number;
  @D() _fade: number;
  @D() _npcString: number;

  @S({ if: (o: PacketModel) => o._npcString === -1 }) _text?: string;
  @S({ if: (o: PacketModel) => o._npcString !== -1 }) _param1?: string;
}

export default class ExShowScreenMessage extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
