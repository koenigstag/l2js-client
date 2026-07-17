import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _objId: number;
  @D() _force: number;
  @D() _angle1: number;
  @D() _angle2: number;
  @D() _time: number;
  @D() _duration: number;
  @D() _relYaw: number;
  @D() _relPitch: number;
  @D() _isWide: number;
  @D() _relAngle: number;
  @D() _unk: number;
}

export default class SpecialCamera extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
