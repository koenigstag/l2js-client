import { BasePacketModel, C, D, H, ArrayModel, ScalarArray } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class ActionKeyModel extends BasePacketModel {
  @D() _cmdId: number;
  @D() _keyId: number;
  @D() _toggleKey1: number;
  @D() _toggleKey2: number;
  @D() _showStatus: number;
}

class UIKeyEntryModel extends BasePacketModel {
  @C() _catElList1: number;
  @ScalarArray("C", "_catElList1") _cat1: number[];

  @C() _catElList2: number;
  @ScalarArray("C", "_catElList2") _cat2: number[];

  @D() _keyElList: number;
  @ArrayModel(ActionKeyModel, "_keyElList") _keys: ActionKeyModel[];
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() _buffsSize: number;
  @D() _categories: number;
  @D() _numKeyCt: number;
  @ArrayModel(UIKeyEntryModel, "_numKeyCt") _entries: UIKeyEntryModel[];

  @D() _unk11: number;
  @D() _unk10: number;
}

export default class ExUISetting extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
