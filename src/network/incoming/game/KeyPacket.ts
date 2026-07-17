import { BasePacketModel, B, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @C() _protocolStatus: number; // 0 - wrong protocol, 1 - protocol ok
  @B(8) _key: Uint8Array;
  @D() _unkn1: number;
  @D() _unkn2: number;
  @C() _unkn3: number;
  @D() _unkn4: number;
}

export default class KeyPacket extends GameClientPacket {
  BlowfishKey!: Uint8Array;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    if (0 === packetData._protocolStatus) {
      throw Error("Wrong protocol version!");
    }

    this.BlowfishKey = new Uint8Array(16);
    this.BlowfishKey.set(packetData._key, 0);
    this.BlowfishKey.set(
      Uint8Array.from([0xc8, 0x27, 0x93, 0x01, 0xa1, 0x6c, 0x31, 0x97]),
      8
    ); // the last 8 bytes are static

    return true;
  }
}
