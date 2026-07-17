import { BasePacketModel, C, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @C() _showComm: number; // c4 1 to show community 00 to hide

  @S() _bbshome: string;
  @S() _bbsgetfav: string;
  @S() _bbsloc: string;
  @S() _bbsclan: string;
  @S() _bbsmemo: string;
  @S() _bbsmail: string;
  @S() _bbsfriends: string;
  @S() _bbsAddFav: string;

  @S() _content: string;
}

export default class ShowBoard extends GameClientPacket {
  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    return true;
  }
}
