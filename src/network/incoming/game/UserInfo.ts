import { transformIs1 } from "../../../utils";
import { BasePacketModel, C, D, F, H, Q, S } from "../../GamePacketModel";
import GameClientPacket from "./GameClientPacket";
import GameServerPacket from "../../outgoing/game/GameServerPacket";
import L2User from "../../../entities/L2User";
import { HairStyle } from "../../../enums/HairStyle";
import { HairColor } from "../../../enums/HairColor";
import { Face } from "../../../enums/Face";
import { ClassId } from "../../../enums/ClassId";

class PacketModelPart1 extends BasePacketModel {
  @C() _id: number;

  @D() X: number;
  @D() Y: number;
  @D() Z: number;
  @D() _vehicleId: number;

  @D() ObjectId: number;
  @S() Name: string;
  @D() Race: number;
  @D() Sex: number;

  @D() BaseClassId: number;
  @D() Level: number;
  @Q() Exp: number;
  @F() _percentFromCurrentLevel: number;

  @D() STR: number;
  @D() DEX: number;
  @D() CON: number;
  @D() INT: number;
  @D() WIT: number;
  @D() MEN: number;

  @D() MaxHp: number;
  @D() Hp: number;
  @D() MaxMp: number;
  @D() Mp: number;
  @D() Sp: number;

  @D() Load: number; // inventory => totalWeight
  @D() MaxLoad: number;

  @D({ transform: (value: number) => value === 40 }) _activeWeapon: boolean; // 20 no weapon, 40 weapon equipped
}

class PacketModelPart2 extends BasePacketModel {
  @D() _talismanSlots: number;
  @D(transformIs1) _canEquipCloak: boolean;

  @D() PAtk: number;
  @D() PAtkSpd: number;
  @D() PDef: number;
  @D() EvasionRate: number;
  @D() Accuracy: number;
  @D() Crit: number;
  @D() MAtk: number;
  @D() MAtkSpd: number;

  @D() _pAtkSpd1: number;
  @D() MDef: number;
  @D() _pvpFlag: number;
  @D() Karma: number;

  @D() RunSpeed: number;
  @D() WalkSpeed: number;
  @D() SwimRunSpeed: number;
  @D() SwimWalkSpeed: number;
  @D() FlyRunSpeed: number;
  @D() FlyWalkSpeed: number;
  @D() _flyRunSpdAgain: number;
  @D() _flyWalkSpeedAgain: number;

  @F() SpeedMultiplier: number;
  @F() AtkSpdMultiplier: number;
  @F() _collisionRadius: number;
  @F() _collisionHeight: number;

  @D() HairStyle: number;
  @D() HairColor: number;
  @D() Face: number;

  @D(transformIs1) IsGM: boolean;

  @S() Title: string;
  @D() ClanId: number;
  @D() _clanCrestId: number;
  @D() _allyId: number;
  @D() _allyCrestId: number;

  // 0x40 leader rights
  // siege flags: attacker - 0x180 sword over name, defender - 0x80 shield, 0xC0 crown (|leader), 0x1C0 flag (|leader)
  @D() _relation: number;

  @C() MountType: number;
  @C() PrivateStoreType: number;
  @C(transformIs1) CanCrystalizeItems: boolean;

  @D() PkKills: number;
  @D() PvpKills: number;
}

class CubicIdModel extends BasePacketModel {
  @H() _cubicId: number;
}

class PacketModelPart3 extends BasePacketModel {
  @C(transformIs1) _isInPartyMatchRoom: boolean;
  @D(transformIs1) _isInvisible: boolean;
  @C() MovementType: number; // 1 - in water; 2 - in the air; 0 - ground

  @D() ClanPrivileges: number;

  @H() RecommLeft: number;
  @H() RecommHave: number;
  @D({ transform: (value: number) => value - 1000000 }) _mountNpcId: number;
  @H() _inventoryLimit: number;

  @D() ClassId: number;

  @D() _unk0: number;

  @D() MaxCp: number;
  @D() Cp: number;

  @C() _mountEffect: number;
  @C() _teamId: number;

  @D() _clanCrestLargeId: number;

  @C(transformIs1) IsNoble: boolean;
  @C(transformIs1) IsHero: boolean;
  @C(transformIs1) IsFishing: boolean;

  @D() _fishX: number;
  @D() _fishY: number;
  @D() _fishZ: number;

  @D() _nameColor: number;

  @C(transformIs1) IsRunning: boolean;

  @D() _pledgeClass: number;
  @D() _pledgeType: number;

  @D() _titleColor: number;

  @D() _cursedWeaponId: number;
  @D() _transformationDisplayId: number;

  @H() _attackAttribute: number;
  @H() AtkElementPower: number;
  @H() _atkFire: number;
  @H() _atkWater: number;
  @H() _atkWind: number;
  @H() _atkEarth: number;
  @H() _atkHoly: number;
  @H() _atkDark: number;

  @D() _agathionId: number;

  @D() Fame: number;

  @D(transformIs1) _isMinimapAllowed: boolean;
  @D() VitalityPoints: number;
  @D() _abnormalVisualEffectSpecial: number;
}

export default class UserInfo extends GameClientPacket {
  User!: L2User;

  // @Override
  readImpl(): boolean {
    const part1 = this.readModel(PacketModelPart1);

    this.User = new L2User();

    this.User.X = part1.X;
    this.User.Y = part1.Y;
    this.User.Z = part1.Z;

    this.User.ObjectId = part1.ObjectId;
    this.User.Name = part1.Name;
    this.User.Race = part1.Race;
    this.User.Sex = part1.Sex;

    this.User.BaseClassId = (ClassId as any)[part1.BaseClassId];
    this.User.Level = part1.Level;
    this.User.Exp = part1.Exp;

    this.User.STR = part1.STR;
    this.User.DEX = part1.DEX;
    this.User.CON = part1.CON;
    this.User.INT = part1.INT;
    this.User.WIT = part1.WIT;
    this.User.MEN = part1.MEN;

    this.User.MaxHp = part1.MaxHp;
    this.User.Hp = part1.Hp;
    this.User.MaxMp = part1.MaxMp;
    this.User.Mp = part1.Mp;
    this.User.Sp = part1.Sp;

    this.User.Load = part1.Load;
    this.User.MaxLoad = part1.MaxLoad;

    GameServerPacket.PAPERDOLL_ORDER.forEach(() => {
      const _slot1 = this.readD();
    });

    GameServerPacket.PAPERDOLL_ORDER.forEach(() => {
      const _slot2 = this.readD();
    });

    GameServerPacket.PAPERDOLL_ORDER.forEach(() => {
      const _slot3 = this.readD();
    });

    const part2 = this.readModel(PacketModelPart2);

    this.User.PAtk = part2.PAtk;
    this.User.PAtkSpd = part2.PAtkSpd;
    this.User.PDef = part2.PDef;
    this.User.EvasionRate = part2.EvasionRate;
    this.User.Accuracy = part2.Accuracy;
    this.User.Crit = part2.Crit;
    this.User.MAtk = part2.MAtk;
    this.User.MAtkSpd = part2.MAtkSpd;

    this.User.MDef = part2.MDef;
    this.User.Karma = part2.Karma;

    this.User.RunSpeed = part2.RunSpeed;
    this.User.WalkSpeed = part2.WalkSpeed;
    this.User.SwimRunSpeed = part2.SwimRunSpeed;
    this.User.SwimWalkSpeed = part2.SwimWalkSpeed;
    this.User.FlyRunSpeed = part2.FlyRunSpeed;
    this.User.FlyWalkSpeed = part2.FlyWalkSpeed;

    this.User.SpeedMultiplier = part2.SpeedMultiplier;
    this.User.AtkSpdMultiplier = part2.AtkSpdMultiplier;

    this.User.HairStyle = (HairStyle as any)[part2.HairStyle];
    this.User.HairColor = (HairColor as any)[part2.HairColor];
    this.User.Face = (Face as any)[part2.Face];

    this.User.IsGM = part2.IsGM;

    this.User.Title = part2.Title;
    this.User.ClanId = part2.ClanId;

    this.User.MountType = part2.MountType;
    this.User.PrivateStoreType = part2.PrivateStoreType;
    this.User.CanCrystalizeItems = part2.CanCrystalizeItems;

    this.User.PkKills = part2.PkKills;
    this.User.PvpKills = part2.PvpKills;

    const _cubicsNum = this.readH();
    for (let j = 0; j < _cubicsNum; j++) {
      this.readModel(CubicIdModel);
    }

    const part3 = this.readModel(PacketModelPart3);

    this.User.MovementType = part3.MovementType;
    this.User.ClanPrivileges = part3.ClanPrivileges;

    this.User.RecommLeft = part3.RecommLeft;
    this.User.RecommHave = part3.RecommHave;

    this.User.ClassId = (ClassId as any)[part3.ClassId];

    this.User.MaxCp = part3.MaxCp;
    this.User.Cp = part3.Cp;

    this.User.IsNoble = part3.IsNoble;
    this.User.IsHero = part3.IsHero;
    this.User.IsFishing = part3.IsFishing;

    this.User.IsRunning = part3.IsRunning;

    this.User.AtkElementPower = part3.AtkElementPower;

    this.User.Fame = part3.Fame;
    this.User.VitalityPoints = part3.VitalityPoints;

    return true;
  }
}
