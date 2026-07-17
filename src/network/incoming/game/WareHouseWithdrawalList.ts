import { BasePacketModel, C, D, H, Q, ArrayModel, NestedModel } from "../../GamePacketModel";
import { ItemModel } from "../../GameItemModel";
import GameClientPacket from "./GameClientPacket";

class WithdrawalEntryModel extends BasePacketModel {
  @NestedModel(ItemModel) _item: ItemModel;
  @D() _objId: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _whType: number;
  @Q() _playerAdena: number;
  @H() _size: number;
  @ArrayModel(WithdrawalEntryModel, "_size") _entries: WithdrawalEntryModel[];
}

export default class WareHouseWithdrawalList extends GameClientPacket {
  static readonly PRIVATE: number = 1;
  static readonly CLAN: number = 4;
  static readonly CASTLE: number = 3; // not sure
  static readonly FREIGHT: number = 1;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
