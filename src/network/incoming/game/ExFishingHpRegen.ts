import { BasePacketModel, C, D, H } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @H() _sub: number;
  @D() ObjectId: number;
  @D() _time: number;
  @D() _fishHp: number;
  @C() HpMode: number; // 0 = HP stop, 1 = HP raise
  @C() _goodUse: number; // 0 = none, 1 = success, 2 = failed
  @C() _anim: number; // Anim: 0 = none, 1 = reeling, 2 = pumping
  @D() _penalty: number;
  @C() Deceptive: number; // 0 = normal hp bar, 1 = purple hp bar
}

export default class ExFishingHpRegen extends GameClientPacket {
  ObjectId!: number;
  HpMode!: number;
  Deceptive!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;
    this.HpMode = packetData.HpMode;
    this.Deceptive = packetData.Deceptive;

    return true;
  }
}
