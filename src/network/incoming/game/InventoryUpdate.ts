import { BasePacketModel, C, H, ArrayModel, NestedModel } from "../../GamePacketModel";
import { ItemModel, toL2Item } from "../../GameItemModel";
import GameClientPacket from "./GameClientPacket";
import L2Item from "../../../entities/L2Item";

class UpdateEntryModel extends BasePacketModel {
  @H() _updateType: number; // Update type : 01-add, 02-modify, 03-remove
  @NestedModel(ItemModel) _item: ItemModel;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _size: number;
  @ArrayModel(UpdateEntryModel, "_size") _entries: UpdateEntryModel[];
}

export default class InventoryUpdate extends GameClientPacket {
  Items: L2Item[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    packetData._entries.forEach((entry) => {
      this.Items.push(toL2Item(entry._item));
    });

    return true;
  }
}
