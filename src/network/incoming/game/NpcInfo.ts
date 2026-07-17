import { transformIs1, transformIs2 } from "../../../utils";
import { BasePacketModel, C, D, F, S } from "../../GamePacketModel";
import AbstractNpcInfo from "./AbstractNpcInfo";
import L2Npc from "../../../entities/L2Npc";
import L2Mob from "../../../entities/L2Mob";
import L2Creature from "../../../entities/L2Creature";

class PacketModel extends BasePacketModel {
  @C() _id: number;
  @D() ObjectId: number;
  @D() _idTemplate: number;
  @D(transformIs1) IsAttackable: boolean;

  @D() X: number;
  @D() Y: number;
  @D() Z: number;
  @D() Heading: number;

  @D() _pad1: number;
  @D() MAtkSpd: number;
  @D() PAtkSpd: number;

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

  @D() _rhandId: number;
  @D() _chestId: number;
  @D() _lhandId: number;

  @C() _unkn1: number; // name above char 1=true ... ??
  @C(transformIs1) IsRunning: boolean;
  @C(transformIs1) IsInCombat: boolean;
  @C(transformIs1) IsDead: boolean;
  @C(transformIs2) _isSummoned: boolean; // invisible ?? 0=false 1=true 2=summoned (only works if model has a summon animation)

  @D() _unkn2: number;
  @S() _name: string;
  @D() _unkn3: number;
  @S() Title: string;

  @D() _pad2: number; // Title color 0=client default
  @D() _pad3: number; // pvp flag
  @D() _pad4: number; // karma

  @D() _invisibleVisualEffect: number;
  @D() _clanId: number;
  @D() _clanCrest: number;
  @D() _allyId: number;
  @D() _allyCrest: number;

  @C() _insideZone: number; // 1=water, 2=flying
  @C() _teamId: number;

  @F() _collisionRadius1: number;
  @F() _collisionHeight2: number;
  @D() _enchantEffect: number; // C4
  @D(transformIs1) _isFlying: boolean; // C6
  @D() _pad5: number;
  @D() _colorEffect: number; // CT1.5 Pet form and skills, Color effect

  @C(transformIs1) IsTargetable: boolean;
  @C(transformIs1) _isShowName: boolean;
  @D() _abnormalVisualEffectSpecial: number;
  @D() _displayEffect: number;
}

export default class NpcInfo extends AbstractNpcInfo {
  ObjectId!: number;
  IsAttackable!: boolean;
  Creature!: L2Creature;

  // @Override
  readImpl(): boolean {
    const packetData = this.readModel(PacketModel);

    this.ObjectId = packetData.ObjectId;
    this.IsAttackable = packetData.IsAttackable;

    const idTemplate = packetData._idTemplate - 1000000;

    if (this.IsAttackable) {
      this.Creature = new L2Mob();
      this.Creature.Name = `Mob #${idTemplate}`;
    } else {
      this.Creature = new L2Npc();
      this.Creature.Name = `NPC #${idTemplate}`;
    }

    this.Creature.Id = idTemplate;
    this.Creature.ObjectId = this.ObjectId;
    this.Creature.IsAttackable = this.IsAttackable;
    this.Creature.X = packetData.X;
    this.Creature.Y = packetData.Y;
    this.Creature.Z = packetData.Z;
    this.Creature.Heading = packetData.Heading;

    this.Creature.MAtkSpd = packetData.MAtkSpd;
    this.Creature.PAtkSpd = packetData.PAtkSpd;

    this.Creature.RunSpeed = packetData.RunSpeed;
    this.Creature.WalkSpeed = packetData.WalkSpeed;
    this.Creature.SwimRunSpeed = packetData.SwimRunSpeed;
    this.Creature.SwimWalkSpeed = packetData.SwimWalkSpeed;
    this.Creature.FlyRunSpeed = packetData.FlyRunSpeed;
    this.Creature.FlyWalkSpeed = packetData.FlyWalkSpeed;

    this.Creature.SpeedMultiplier = packetData.SpeedMultiplier;
    this.Creature.AtkSpdMultiplier = packetData.AtkSpdMultiplier;

    this.Creature.IsRunning = packetData.IsRunning;
    this.Creature.IsInCombat = packetData.IsInCombat;
    this.Creature.IsDead = packetData.IsDead;

    this.Creature.Title = packetData.Title;

    this.Creature.IsTargetable = packetData.IsTargetable;

    return true;
  }
}
