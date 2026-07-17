import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() CharObjectId: number;
  @D() VisualEffect: number;
  @C() LectureMark: number;
}

export default class ExBrExtraUserInfo extends GameClientPacket {
  CharObjectId!: number;
  VisualEffect!: number;
  LectureMark!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.CharObjectId = packetData.CharObjectId;
    this.VisualEffect = packetData.VisualEffect;
    this.LectureMark = packetData.LectureMark;

    return true;
  }
}
