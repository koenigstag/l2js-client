import { transformIs1 } from "../../../utils";
import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() RecipeId: number;
  @D() CraftType: number; // 0 = Dwarven - 1 = Common
  @D() PlayerCurrentMp: number;
  @D() PlayerMaxMp: number;
  @D(transformIs1) Success: boolean;
}

export default class RecipeItemMakeInfo extends GameClientPacket {
  RecipeId: number = 0;
  CraftType: number = 0;
  PlayerCurrentMp: number = 0;
  PlayerMaxMp: number = 0;
  Success: boolean = false;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.RecipeId = packetData.RecipeId;
    this.CraftType = packetData.CraftType;
    this.PlayerCurrentMp = packetData.PlayerCurrentMp;
    this.PlayerMaxMp = packetData.PlayerMaxMp;
    this.Success = packetData.Success;

    return true;
  }
}
