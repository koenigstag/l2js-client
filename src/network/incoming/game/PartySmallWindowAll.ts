import { BasePacketModel, C, D, S, ArrayModel, NestedModel } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";
import L2PartyMember from "../../../entities/L2PartyMember";

class SummonModel extends BasePacketModel {
  @D() _summonId: number;
  @D() _summonType: number;
  @S() _summonName: string;
  @D() _summonHp: number;
  @D() _summonMaxHp: number;
  @D() _summonMp: number;
  @D() _summonMaxMp: number;
  @D() _summonLevel: number;
}

class MemberModel extends BasePacketModel {
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
  @D() _pad1: number;
  @D() Race: number;

  @D() _pad2: number;
  @D() _pad3: number;

  @D() _summonObjId: number;
  @NestedModel(SummonModel, { if: (o: MemberModel) => o._summonObjId > 0 }) _summon?: SummonModel;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() _leaderObjectId: number;
  @D() _distributionType: number;
  @D() _memberCount: number;
  @ArrayModel(MemberModel, "_memberCount") _members: MemberModel[];
}

export default class PartySmallWindowAll extends GameClientPacket {
  PartyMembers: L2PartyMember[] = [];

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    packetData._members.forEach((member) => {
      const char = new L2PartyMember();

      char.ObjectId = member.ObjectId;
      char.Name = member.Name;
      char.Cp = member.Cp;
      char.MaxCp = member.MaxCp;
      char.Hp = member.Hp;
      char.MaxHp = member.MaxHp;
      char.Mp = member.Mp;
      char.MaxMp = member.MaxMp;
      char.Level = member.Level;
      char.ClassId = member.ClassId;
      char.Race = member.Race;
      char.IsPartyLeader = char.ObjectId === packetData._leaderObjectId;
      char.IsDead = char.Hp <= 0;

      this.PartyMembers.push(char);
    });

    return true;
  }
}
