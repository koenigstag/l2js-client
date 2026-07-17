import { ShortcutType } from "../../../enums/ShortcutType";
import { BasePacketModel, C, D, NestedModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class ItemShortcutModel extends BasePacketModel {
  @D() _itemId: number;
  @D() _charType: number;
  @D() _sharedReuseGroup: number;
  @D() _unk0: number;
  @D() _unk1: number;
  @D() _itemAugmentId: number;
}

class SkillShortcutModel extends BasePacketModel {
  @D() _skillId: number;
  @D() _skillLevel: number;
  @C() _c5: number;
  @D() _charType1: number;
}

class OtherShortcutModel extends BasePacketModel {
  @D() _uId: number;
  @D() _charType2: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _shortcutType: number;
  @D() _c4Client: number; // slot + (page * 12)

  @NestedModel(ItemShortcutModel, { if: (o: PacketModel) => o._shortcutType === ShortcutType.ITEM })
  _item?: ItemShortcutModel;

  @NestedModel(SkillShortcutModel, { if: (o: PacketModel) => o._shortcutType === ShortcutType.SKILL })
  _skill?: SkillShortcutModel;

  @NestedModel(OtherShortcutModel, {
    if: (o: PacketModel) =>
      [ShortcutType.ACTION, ShortcutType.MACRO, ShortcutType.RECIPE, ShortcutType.BOOKMARK].includes(
        o._shortcutType
      ),
  })
  _other?: OtherShortcutModel;
}

export default class ShortCutRegister extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
