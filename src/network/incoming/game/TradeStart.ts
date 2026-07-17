import { BasePacketModel, C, D, H, ArrayModel } from "../../GamePacketModel";
import { ItemModel } from "../../GameItemModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _objId: number;
  @H() _size: number;
  @ArrayModel(ItemModel, "_size") _items: ItemModel[];
}

export default class TradeStart extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
