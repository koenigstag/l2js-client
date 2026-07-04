import { BasePacketModel, D, ArrayModel, Loc, Location, NestedModel, Q, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class ParamSkillModel extends BasePacketModel {
  @D() _skillId: number;
  @D() _skillLevel: number;
}

class ParamModel extends BasePacketModel {
  @D() _paramType: number;

  @S({
    if: (o: ParamModel) =>
      [AbstractMessagePacket.TYPE_TEXT, AbstractMessagePacket.TYPE_PLAYER_NAME].includes(o._paramType),
  })
  _paramString?: string;

  @Q({
    if: (o: ParamModel) => o._paramType === AbstractMessagePacket.TYPE_LONG_NUMBER,
  })
  _paramLong?: number;

  @D({
    if: (o: ParamModel) =>
      [
        AbstractMessagePacket.TYPE_ITEM_NAME,
        AbstractMessagePacket.TYPE_CASTLE_NAME,
        AbstractMessagePacket.TYPE_INT_NUMBER,
        AbstractMessagePacket.TYPE_NPC_NAME,
        AbstractMessagePacket.TYPE_ELEMENT_NAME,
        AbstractMessagePacket.TYPE_SYSTEM_STRING,
        AbstractMessagePacket.TYPE_INSTANCE_NAME,
        AbstractMessagePacket.TYPE_DOOR_NAME,
      ].includes(o._paramType),
  })
  _paramDigits?: number;

  @Loc({
    if: (o: ParamModel) => o._paramType === AbstractMessagePacket.TYPE_ZONE_NAME,
  })
  _paramLoc?: Location;

  @NestedModel(ParamSkillModel, { if: (o: ParamModel) => o._paramType === AbstractMessagePacket.TYPE_SKILL_NAME })
  _skill?: ParamSkillModel;
}

export class MessagePacketModel extends BasePacketModel {
  @D() messageId: number;
  @D() _paramsLength: number;

  @ArrayModel(ParamModel, "_paramsLength")
  _params: ParamModel[];
}

export default abstract class AbstractMessagePacket extends GameClientPacket {
  // 15 exists in goddess of destruction but also may works in h5 needs to be verified!
  // private static final byte TYPE_CLASS_ID = 15;
  // id 14 unknown
  static readonly TYPE_SYSTEM_STRING: number = 13;
  static readonly TYPE_PLAYER_NAME: number = 12;
  static readonly TYPE_DOOR_NAME: number = 11;
  static readonly TYPE_INSTANCE_NAME: number = 10;
  static readonly TYPE_ELEMENT_NAME: number = 9;
  // id 8 - same as 3
  static readonly TYPE_ZONE_NAME: number = 7;
  static readonly TYPE_LONG_NUMBER: number = 6;
  static readonly TYPE_CASTLE_NAME: number = 5;
  static readonly TYPE_SKILL_NAME: number = 4;
  static readonly TYPE_ITEM_NAME: number = 3;
  static readonly TYPE_NPC_NAME: number = 2;
  static readonly TYPE_INT_NUMBER: number = 1;
  static readonly TYPE_TEXT: number = 0;

  messageId!: number;

  messageParams = new Array<any>();

  readMe(): void {
    const packetData = this.readModel(MessagePacketModel);

    this.setData(packetData);
  }

  setData(packetData: MessagePacketModel) {
    this.messageId = packetData.messageId;

    this.messageParams = packetData._params.map((param) => {
      if (param._paramString !== undefined) {
        return param._paramString;
      } else if (param._paramLong !== undefined) {
        return param._paramLong;
      } else if (param._paramDigits !== undefined) {
        return param._paramDigits;
      } else if (param._paramLoc !== undefined) {
        return [param._paramLoc[0], param._paramLoc[1], param._paramLoc[2]];
      } else if (param._skill !== undefined) {
        return [param._skill._skillId, param._skill._skillLevel];
      }
    });
  }
}
