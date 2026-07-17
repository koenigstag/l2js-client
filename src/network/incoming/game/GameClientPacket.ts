import L2Item from "../../../entities/L2Item";
import ReceivablePacket from "../../../mmocore/ReceivablePacket";
import { ItemModel, toL2Item } from "../../GameItemModel";

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
    return toL2Item(this.readModel(ItemModel));
  }

  abstract readImpl(): boolean;
}
