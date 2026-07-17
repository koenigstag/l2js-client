import { BasePacketModel, C, D, Q, ArrayModel, NestedModel } from "../../GamePacketModel";
import { ItemModel } from "../../GameItemModel";
import GameClientPacket from "./GameClientPacket";

class SellEntryModel extends BasePacketModel {
  @NestedModel(ItemModel) _item: ItemModel;
  @Q() _price: number;
  @Q() _referencePrice: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _objId: number;
  @D() _packageSale: number;
  @Q() _playerAdena: number;
  @D() _len: number;
  @ArrayModel(SellEntryModel, "_len") _entries: SellEntryModel[];
}

export default class PrivateStoreListSell extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
