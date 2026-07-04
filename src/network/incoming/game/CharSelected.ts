import L2User from "../../../entities/L2User";
import { BasePacketModel, C, D, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";

export class PacketModel extends BasePacketModel {
  @C() _id: number;
  @S() Name: string;
  @D() ObjectId: number;
  @S() Title: string;
  @D() _sessionId: number;
  @D() ClanId: number;
  @D() _unkn1: number;
  @D() Sex: number;
  @D() Race: number;
  @D() ClassId: number;
  @D() _active1: number;
  @D() X: number;
  @D() Y: number;
  @D() Z: number;
  @D() Hp: number;
  @D() Mp: number;
}

export default class CharSelected extends GameClientPacket {
  User!: L2User;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    const user = new L2User();
    user.Name = packetData.Name;
    user.ObjectId = packetData.ObjectId;
    user.Title = packetData.Title;
    user.Sex = packetData.Sex;
    user.Race = packetData.Race;
    user.ClassId = packetData.ClassId;
    user.X = packetData.X;
    user.Y = packetData.Y;
    user.Z = packetData.Z;
    user.Hp = packetData.Hp;
    user.Mp = packetData.Mp;

    this.User = user;

    return true;
  }
}
