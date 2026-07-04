import L2Character from "../../../entities/L2Character";
import GameClientPacket from "./GameClientPacket";
import GameServerPacket from "../../outgoing/game/GameServerPacket";
import { HairStyle } from "../../../enums/HairStyle";
import { HairColor } from "../../../enums/HairColor";
import { Face } from "../../../enums/Face";
import { ClassId } from "../../../enums/ClassId";
import { BasePacketModel, C, D, F, ArrayModel, H, Loc, Location, S } from "../../GamePacketModel";
import { transformIs0, transformIs1 } from "../../../utils";

class PaperdollDisplayModel extends BasePacketModel {
  @D() _slotItemDisplayId: number;
}

class PaperdollAugmentationModel extends BasePacketModel {
  @D() _slotItemAugmentationId: number;
}

class CubicModel extends BasePacketModel {
  @H() _cubicId: number;
}

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @Loc() location: Location;
  @D() _vehicleId: number;
  @D() ObjectId: number;
  @S() Name: string;
  @D() Race: number;
  @D() Sex: number;
  @D() BaseClassId: number;

  _paperdollOrder = CharInfo.PAPERDOLL_ORDER;

  @ArrayModel(PaperdollDisplayModel, "_paperdollOrder")
  _paperdoll: PaperdollDisplayModel[];

  @ArrayModel(PaperdollAugmentationModel, "_paperdollOrder")
  _paperdollAugmentation: PaperdollAugmentationModel[];

  @D() _talismanSlots: number;
  @D(transformIs1) _canEquipCloak: boolean;
  @D() _pvpFlag: number;
  @D() Karma: number;
  @D() MAtkSpd: number;
  @D() PAtkSpd: number;
  @D() _pad0: number;
  @D() RunSpeed: number;
  @D() WalkSpeed: number;
  @D() SwimRunSpeed: number;
  @D() SwimWalkSpeed: number;
  @D() FlyRunSpeed: number;
  @D() FlyWalkSpeed: number;
  @D() _flyRunSpd1: number;
  @D() _flyWalkSpd1: number;
  @F() SpeedMultiplier: number;
  @F() AtkSpdMultiplier: number;
  @F() _collisionRadius: number;
  @F() _collisionHeight: number;
  @D() HairStyle: number;
  @D() HairColor: number;
  @D() Face: number;
  @S() Title: string;
  @D() _clanId: number;
  @D() _clanCrestId: number;
  @D() _clanAllyId: number;
  @D() _clanAllyCrestId: number;
  @C(transformIs0) IsSitting: boolean; // standing = 1 sitting = 0
  @C(transformIs1) IsRunning: boolean; // running = 1 walking = 0
  @C(transformIs1) IsInCombat: boolean;
  @C(transformIs1) _deadInOlympiad: boolean;
  @C(transformIs1) _invisible: boolean;
  @C() _mountType: number; // 1-on Strider, 2-on Wyvern, 3-on Great Wolf, 0-no mount
  @C() _privateStoreType: number;
  @H() _cubicsSize: number;
  @ArrayModel(CubicModel, "_cubicsSize")
  _cubics: CubicModel[];
  @C() _isInPartyMatchRoom: number;
  @D() _abnormalVisualEffects: number;
  @C() _isFlyingOrSwimming: number; // 1 - in water, 2 = fly, else 0
  @H() RecommHave: number;
  @D() _mountNpcId: number;
  @D() ClassId: number;
  @D() _pad1: number;
  @C() _enchantEffect: number;
  @C() _teamId: number;
  @D() _clanCrestLargeId: number;
  @C(transformIs1) IsNoble: boolean;
  @C(transformIs1) IsHero: boolean;
  @C(transformIs1) IsFishing: boolean;
  @D() _fishX: number;
  @D() _fishY: number;
  @D() _fishZ: number;
  @D() _nameColor: number;
  @D() Heading: number;
  @D() _pledgeClass: number;
  @D() _pledgeType: number;
  @D() _titleColor: number;
  @D() _cursedWeaponLevel: number;
  @D() _reputationScore: number;
  @D() _transformationDisplayId: number;
  @D() _agathionId: number;
  @D() _pad3: number;
  @D() _abnormalVisualEffectSpecial: number;
}

export default class CharInfo extends GameClientPacket {
  static readonly PAPERDOLL_ORDER: number[] = [
    GameServerPacket.PAPERDOLL_UNDER,
    GameServerPacket.PAPERDOLL_HEAD,
    GameServerPacket.PAPERDOLL_RHAND,
    GameServerPacket.PAPERDOLL_LHAND,
    GameServerPacket.PAPERDOLL_GLOVES,
    GameServerPacket.PAPERDOLL_CHEST,
    GameServerPacket.PAPERDOLL_LEGS,
    GameServerPacket.PAPERDOLL_FEET,
    GameServerPacket.PAPERDOLL_CLOAK,
    GameServerPacket.PAPERDOLL_RHAND,
    GameServerPacket.PAPERDOLL_HAIR,
    GameServerPacket.PAPERDOLL_HAIR2,
    GameServerPacket.PAPERDOLL_RBRACELET,
    GameServerPacket.PAPERDOLL_LBRACELET,
    GameServerPacket.PAPERDOLL_DECO1,
    GameServerPacket.PAPERDOLL_DECO2,
    GameServerPacket.PAPERDOLL_DECO3,
    GameServerPacket.PAPERDOLL_DECO4,
    GameServerPacket.PAPERDOLL_DECO5,
    GameServerPacket.PAPERDOLL_DECO6,
    GameServerPacket.PAPERDOLL_BELT,
  ];

  Char: L2Character = new L2Character();

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.Char.ObjectId = packetData.ObjectId;
    this.Char.X = packetData.location[0];
    this.Char.Y = packetData.location[1];
    this.Char.Z = packetData.location[2];
    this.Char.Name = packetData.Name;
    this.Char.Race = packetData.Race;
    this.Char.Sex = packetData.Sex;
    this.Char.BaseClassId = (ClassId as any)[packetData.BaseClassId];
    this.Char.Karma = packetData.Karma;
    this.Char.MAtkSpd = packetData.MAtkSpd;
    this.Char.PAtkSpd = packetData.PAtkSpd;
    this.Char.RunSpeed = packetData.RunSpeed;
    this.Char.WalkSpeed = packetData.WalkSpeed;
    this.Char.SwimRunSpeed = packetData.SwimRunSpeed;
    this.Char.SwimWalkSpeed = packetData.SwimWalkSpeed;
    this.Char.FlyRunSpeed = packetData.FlyRunSpeed;
    this.Char.FlyWalkSpeed = packetData.FlyWalkSpeed;
    this.Char.SpeedMultiplier = packetData.SpeedMultiplier;
    this.Char.AtkSpdMultiplier = packetData.AtkSpdMultiplier;
    this.Char.HairStyle = (HairStyle as any)[packetData.HairStyle];
    this.Char.HairColor = (HairColor as any)[packetData.HairColor];
    this.Char.Face = (Face as any)[packetData.Face];
    this.Char.Title = packetData.Title;
    this.Char.IsSitting = packetData.IsSitting;
    this.Char.IsRunning = packetData.IsRunning;
    this.Char.IsInCombat = packetData.IsInCombat;
    this.Char.RecommHave = packetData.RecommHave;
    this.Char.ClassId = (ClassId as any)[packetData.ClassId];
    this.Char.IsNoble = packetData.IsNoble;
    this.Char.IsHero = packetData.IsHero;
    this.Char.IsFishing = packetData.IsFishing;
    this.Char.Heading = packetData.Heading;

    return true;
  }
}
