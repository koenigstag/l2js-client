import { BasePacketModel, C, D, Q, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class HennaEntryModel extends BasePacketModel {
  @D() _dyeId: number;
  @D() _dyeItemId: number;
  @D() _cancelCount: number;
  @D() _unk2: number;
  @D() _cancelFee: number;
  @D() _unk3: number; // 00
  @D() _unk4: number; // 01
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @Q() _adena: number;
  @D() _unk1: number; // 00
  @D() _emptySlots: number;
  @ArrayModel(HennaEntryModel, "_emptySlots") _hennas: HennaEntryModel[];
}

export default class HennaRemoveList extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
