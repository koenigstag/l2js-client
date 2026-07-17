import { BasePacketModel, C, D, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";
import L2Recipe from "../../../entities/L2Recipe";

class RecipeEntryModel extends BasePacketModel {
  @D() Id: number;
  @D() ObjectId: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D({ transform: (value: number) => value === 0 }) IsDwarvenCraft: boolean; // 0 = Dwarven - 1 = Common
  @D() _maxMp: number;
  @D() _len: number;
  @ArrayModel(RecipeEntryModel, "_len") _recipes: RecipeEntryModel[];
}

export default class RecipeBookItemList extends GameClientPacket {
  IsDwarvenCraft!: boolean;
  Recipes: L2Recipe[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.IsDwarvenCraft = packetData.IsDwarvenCraft;

    packetData._recipes.forEach((entry) => {
      const recipe = new L2Recipe();
      recipe.Id = entry.Id;
      recipe.ObjectId = entry.ObjectId;
      this.Recipes.push(recipe);
    });

    return true;
  }
}
