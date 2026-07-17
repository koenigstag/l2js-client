import { BasePacketModel, C, D, Q, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class HennaEntryModel extends BasePacketModel {
  @D() _dyeId: number; // dye Id
  @D() _dyeItemId: number; // item Id of the dye
  @Q() _wearCount: number; // amount of dyes required
  @Q() _wearFee: number; // amount of Adena required
  @D() _isAllowed: number; // meet the requirement or not
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @Q() _adena: number; // activeChar current amount of Adena
  @D() _slots: number; // available equip slot, almost always 3
  @D() _hennaEquipListSize: number;
  @ArrayModel(HennaEntryModel, "_hennaEquipListSize") _hennas: HennaEntryModel[];
}

export default class HennaEquipList extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
