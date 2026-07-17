import { BasePacketModel, C, D, H, Q } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _itemsAddedCount: number;
  @H() _unk1: number;
  @D() _objId: number;
  @D() _displayId: number;
  @Q() _count: number;
  @H() _type2: number;
  @H() _custType1: number;
  @D() _bodyPart: number;
  @H() _enchant: number;
  @H() _unk2: number;
  @H() _custType2: number;

  // Item elemental and enchant
  @H() _attackElementType: number;
  @H() _attackElementPower: number;

  @H() _defAttFire: number;
  @H() _defAttWater: number;
  @H() _defAttWind: number;
  @H() _defAttEarth: number;
  @H() _defAttHolly: number;
  @H() _defAttUnholly: number;

  @H() _enchantOption1: number;
  @H() _enchantOption2: number;
  @H() _enchantOption3: number;
}

export default class TradeOwnAdd extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
