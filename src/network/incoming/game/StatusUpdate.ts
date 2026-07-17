import { BasePacketModel, C, D, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class StatEntryModel extends BasePacketModel {
  @D() _status: number;
  @D() _value: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @D() _attributeSize: number;
  @ArrayModel(StatEntryModel, "_attributeSize") _attributes: StatEntryModel[];
}

export default class StatusUpdate extends GameClientPacket {
  static readonly LEVEL: number = 0x01;
  static readonly EXP: number = 0x02;
  static readonly STR: number = 0x03;
  static readonly DEX: number = 0x04;
  static readonly CON: number = 0x05;
  static readonly INT: number = 0x06;
  static readonly WIT: number = 0x07;
  static readonly MEN: number = 0x08;

  static readonly CUR_HP: number = 0x09;
  static readonly MAX_HP: number = 0x0a;
  static readonly CUR_MP: number = 0x0b;
  static readonly MAX_MP: number = 0x0c;

  static readonly SP: number = 0x0d;
  static readonly CUR_LOAD: number = 0x0e;
  static readonly MAX_LOAD: number = 0x0f;

  static readonly P_ATK: number = 0x11;
  static readonly ATK_SPD: number = 0x12;
  static readonly P_DEF: number = 0x13;
  static readonly EVASION: number = 0x14;
  static readonly ACCURACY: number = 0x15;
  static readonly CRITICAL: number = 0x16;
  static readonly M_ATK: number = 0x17;
  static readonly CAST_SPD: number = 0x18;
  static readonly M_DEF: number = 0x19;
  static readonly PVP_FLAG: number = 0x1a;
  static readonly KARMA: number = 0x1b;

  static readonly CUR_CP: number = 0x21;
  static readonly MAX_CP: number = 0x22;

  ObjectId!: number;

  Stats: Record<number, number> = {};

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;

    packetData._attributes.forEach((entry) => {
      this.Stats[entry._status] = entry._value;
    });

    return true;
  }
}
