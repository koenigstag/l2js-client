import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() _inventory: number;
  @D() _warehouse: number;
  @D() _clan: number;
  @D() _privateSell: number;
  @D() _privateBuy: number;
  @D() _receipeD: number;
  @D() _recipe: number;
  @D() _inventoryExtraSlots: number;
  @D() _inventoryQuestItems: number;
}

export default class ExStorageMaxCount extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
