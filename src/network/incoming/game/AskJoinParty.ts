import GameClientPacket from "./GameClientPacket";
import { PartyDistributionType } from "../../../enums/PartyDistributionType";
import { BasePacketModel, C, D, S } from "../../GamePacketModel";

class PacketModel extends BasePacketModel {
  @C() _id: number;

  @S() RequestorName = "";

  @D() PartyDistributionType?: PartyDistributionType;
}

export default class AskJoinParty extends GameClientPacket {
  RequestorName: string;
  PartyDistributionType?: PartyDistributionType;

  // @Override
  readImpl(): boolean {
    const data = this.readModel(PacketModel);
    this.RequestorName = data.RequestorName;
    this.PartyDistributionType = data.PartyDistributionType;

    return true;
  }
}
