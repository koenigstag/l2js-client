import L2Item from "../../../entities/L2Item";
import ReceivablePacket from "../../../mmocore/ReceivablePacket";
import { ItemModel } from "../../GameItemModel";

export default abstract class GameClientPacket extends ReceivablePacket {
  // @Override
  read(): boolean {
    try {
      return this.readImpl();
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  readItem(): L2Item {
    const data = this.readModel(ItemModel);

    const item = new L2Item();
    item.ObjectId = data.ObjectId;
    item.Id = data.Id;
    item.Count = data.Count;
    item.IsEquipped = data.IsEquipped;
    item.EnchantLevel = data.EnchantLevel;
    item.AugmentBonus = data.AugmentBonus;
    item.AttackElementVal = data.AttackElementVal;
    item.DefAttFire = data.DefAttFire;
    item.DefAttWater = data.DefAttWater;
    item.DefAttWind = data.DefAttWind;
    item.DefAttEarth = data.DefAttEarth;
    item.DefAttHolly = data.DefAttHolly;
    item.DefAttUnholly = data.DefAttUnholly;

    return item;
  }

  abstract readImpl(): boolean;
}
