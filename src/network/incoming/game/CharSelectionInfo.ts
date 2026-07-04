import L2ObjectCollection from "../../../entities/L2ObjectCollection";
import L2User from "../../../entities/L2User";
import { ClassId } from "../../../enums/ClassId";
import { Race } from "../../../enums/Race";
import { Sex } from "../../../enums/Sex";
import { ArrayModel, BasePacketModel, C, D, F, Q, S } from "../../GamePacketModel";
import GameServerPacket from "../../outgoing/game/GameServerPacket";
import GameClientPacket from "./GameClientPacket";

class PaperdollModel extends BasePacketModel {
  @D() _unknD: number;
}

class UserModel extends BasePacketModel {
  @S() Name: string;
  @D() ObjectId: number;
  @S() _loginName: string;
  @D() _sessionId: number;
  @D() ClanId: number;
  @D() _builderLevel: number;
  @D() Sex: number;
  @D() Race: number;
  @D() BaseClassId: number;
  @D() _active: number;
  @D() X: number;
  @D() Y: number;
  @D() Z: number;
  @D() Hp: number;
  @D() Mp: number;
  @D() Sp: number;
  @Q() Exp: number
  @F() ExpPercent: number;
  @D() Level: number;
  @D() Karma: number
  @D() PkKills: number;
  @D() PvpKills: number
  @D() _unknD1: number;
  @D() _unknD2: number;
  @D() _unknD3: number;
  @D() _unknD4: number;
  @D() _unknD5: number;
  @D() _unknD6: number;
  @D() _unknD7: number;
  _paperdollOrder = GameServerPacket.PAPERDOLL_ORDER;
  @ArrayModel(PaperdollModel, "_paperdollOrder") _paperdoll: PaperdollModel[];
  @D() HairStyle: number;
  @D() HairColor: number;
  @D() Face: number;
  @F() MaxHp: number;
  @F() MaxMp: number;
  @D() _daysLeftBeforeDelete: number;
  @D() ClassId: number;
  @D() _c3AutoSelectChar: number;
  @C() _enchantEffect: number;
  @D() _augmentationId: number;
  @D() _hideTransformation: number;
  @D() _notImplementedPetId: number;
  @D() _notImplementedPetLevel: number;
  @D() _notImplementedPetMaxFood: number;
  @D() _notImplementedPetCurrentFood: number;
  @F() _notImplementedPetMaxHP: number;
  @F() _notImplementedPetMaxMP: number;
  @D() Vitality: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() characterPackagesSize: number;
  @D() _charMaxNumber: number;
  @D() _pad: number;

  @ArrayModel(UserModel, "characterPackagesSize") characterPackages: UserModel[];
}

export default class CharSelectionInfo extends GameClientPacket {
  characterPackagesSize!: number;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.characterPackagesSize = packetData.characterPackagesSize;

    const _characterPackages: L2ObjectCollection<L2User> = new L2ObjectCollection();

    for (let i = 0; i < this.characterPackagesSize; i++) {
      const userData = packetData.characterPackages[i];

      const char: L2User = new L2User();

      char.Name = userData.Name;

      char.ObjectId = userData.ObjectId;
      char.Sex = (Sex as any)[userData.Sex];
      char.Race = (Race as any)[userData.Race];
      char.BaseClassId = (ClassId as any)[userData.BaseClassId];

      char.X = userData.X;
      char.Y = userData.Y;
      char.Z = userData.Z;

      char.Hp = userData.Hp;
      char.Mp = userData.Mp;

      char.Sp = userData.Sp;
      char.Exp = userData.Exp;
      char.ExpPercent = userData.ExpPercent;

      char.Level = userData.Level;
      char.Karma = userData.Karma;
      char.PkKills = userData.PkKills;
      char.PvpKills = userData.PvpKills;

      char.MaxHp = userData.MaxHp;
      char.MaxMp = userData.MaxMp;

      char.ClassId = (ClassId as any)[userData.ClassId];

      char.Vitality = userData.Vitality;

      _characterPackages.add(char);
    }

    return true;
  }
}
