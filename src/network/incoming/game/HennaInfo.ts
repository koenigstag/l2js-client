import { BasePacketModel, C, D, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class HennaEntryModel extends BasePacketModel {
  @D() _dyeId: number;
  @D() _unk: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;

  @C() _int: number;
  @C() _str: number;
  @C() _con: number;
  @C() _men: number;
  @C() _dex: number;
  @C() _wit: number;

  @D() _slots: number; // 3
  @D() _hennaEquipListSize: number;
  @ArrayModel(HennaEntryModel, "_hennaEquipListSize") _hennas: HennaEntryModel[];
}

export default class HennaInfo extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
