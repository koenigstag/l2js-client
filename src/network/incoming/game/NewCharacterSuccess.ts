import { BasePacketModel, C, D, ArrayModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class ClassTemplateModel extends BasePacketModel {
  @D() _race: number;
  @D() _class: number;
  @D() _baseStr: number;
  @D() _unknown: number;
  @D() _baseDex: number;
  @D() _unknown2: number;
  @D() _unknown3: number;
  @D() _baseCon: number;
  @D() _unknown4: number;
  @D() _unknown5: number;
  @D() _baseInt: number;
  @D() _unknown6: number;
  @D() _unknown7: number;
  @D() _baseWit: number;
  @D() _unknown8: number;
  @D() _unknown9: number;
  @D() _baseMen: number;
  @D() _unknown10: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _size: number;
  @ArrayModel(ClassTemplateModel, "_size") _templates: ClassTemplateModel[];
}

export default class NewCharacterSuccess extends GameClientPacket {
  CreatureObjId!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
