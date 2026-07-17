import { BasePacketModel, C, D, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";
import L2PartyMember from "../../../entities/L2PartyMember";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @S() Name: string;
  @D() Cp: number;
  @D() MaxCp: number;
  @D() Hp: number;
  @D() MaxHp: number;
  @D() Mp: number;
  @D() MaxMp: number;
  @D() Level: number;
  @D() ClassId: number;
}

export default class PartySmallWindowUpdate extends GameClientPacket {
  PartyMember: L2PartyMember = new L2PartyMember();

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.PartyMember.ObjectId = packetData.ObjectId;
    this.PartyMember.Name = packetData.Name;
    this.PartyMember.Cp = packetData.Cp;
    this.PartyMember.MaxCp = packetData.MaxCp;
    this.PartyMember.Hp = packetData.Hp;
    this.PartyMember.MaxHp = packetData.MaxHp;
    this.PartyMember.Mp = packetData.Mp;
    this.PartyMember.MaxMp = packetData.MaxMp;
    this.PartyMember.Level = packetData.Level;
    this.PartyMember.ClassId = packetData.ClassId;
    this.PartyMember.IsDead = this.PartyMember.Hp <= 0;

    return true;
  }
}
