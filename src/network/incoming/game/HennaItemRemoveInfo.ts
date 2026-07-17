import { BasePacketModel, C, D, Q } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;

  @D() _dyeId: number; // dye Id
  @D() _dyeItemId: number; // item Id of the dye
  @Q() _cancelCount: number; // total amount of dye require
  @Q() _cancelFee: number; // total amount of Adena require to remove symbol
  @D() _isAllowed: number; // able to remove or not

  @Q() _adena: number;

  @D() _int: number;
  @C() _equipInt: number;
  @D() _str: number;
  @C() _equipStr: number;
  @D() _con: number;
  @C() _equipCon: number;
  @D() _men: number;
  @C() _equipMen: number;
  @D() _dex: number;
  @C() _equipDex: number;
  @D() _wit: number;
  @C() _equipWit: number;
}

export default class HennaItemRemoveInfo extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
