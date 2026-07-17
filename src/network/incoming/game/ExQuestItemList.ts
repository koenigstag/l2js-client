import { BasePacketModel, C, H, ArrayModel } from "../../GamePacketModel";
import { ItemModel, toL2Item } from "../../GameItemModel";
import GameClientPacket from "./GameClientPacket";
import L2Item from "../../../entities/L2Item";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @H() _size: number;
  @ArrayModel(ItemModel, "_size") _items: ItemModel[];
}

export default class ExQuestItemList extends GameClientPacket {
  Items: L2Item[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    packetData._items.forEach((data) => {
      const item = toL2Item(data);
      item.IsQuest = true;
      this.Items.push(item);
    });

    return true;
  }
}
