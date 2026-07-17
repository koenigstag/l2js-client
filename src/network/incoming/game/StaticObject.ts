import { transformIs1 } from "../../../utils";
import { BasePacketModel, C, D } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _staticObjectId: number;
  @D() _objectId: number;
  @D() _type: number;
  @D(transformIs1) _isTargetable: boolean;
  @D() _meshIndex: number;
  @D(transformIs1) _isClosed: boolean;
  @D(transformIs1) _isEnemy: boolean;
  @D() _currentHp: number;
  @D() _maxHp: number;
  @D(transformIs1) _showHp: boolean;
  @D() _damageGrade: number;
}

export default class StaticObject extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
