import { transformIs1 } from "../utils";
import { BasePacketModel, D, H, Q } from "./GamePacketModel";
import L2Item from "../entities/L2Item";

/**
 * Mirrors GameClientPacket.readItem() — shared by every packet that carries a list of items
 * (inventory, item list, warehouse, trade, private store, quest items).
 */
export class ItemModel extends BasePacketModel {
  @D() ObjectId: number;
  @D() Id: number;
  @D() _location: number;
  @Q() Count: number;
  @H() _type: number; // Item Type 2 : 00-weapon, 01-shield/armor, 02-ring/earring/necklace, 03-questitem, 04-adena, 05-item
  @H() _customType: number;
  @H(transformIs1) IsEquipped: boolean;
  @D() _bodyPart: number; // Slot : 0006-lr.ear, 0008-neck, 0030-lr.finger, 0040-head, 0100-l.hand, 0200-gloves, 0400-chest, 0800-pants, 1000-feet, 4000-r.hand, 8000-r.hand
  @H() EnchantLevel: number;
  @H() _customType2: number;
  @D() AugmentBonus: number;
  @D() _mana: number;
  @D() _time: number;

  // Item elemental and enchant
  @H() _attackElementType: number;
  @H() AttackElementVal: number;

  @H() DefAttFire: number;
  @H() DefAttWater: number;
  @H() DefAttWind: number;
  @H() DefAttEarth: number;
  @H() DefAttHolly: number;
  @H() DefAttUnholly: number;

  @H() _enchantOption1: number;
  @H() _enchantOption2: number;
  @H() _enchantOption3: number;
}

export function toL2Item(data: ItemModel): L2Item {
  const item = new L2Item();
  item.ObjectId = data.ObjectId;
  item.Id = data.Id;
  item.Count = data.Count;
  item.IsEquipped = data.IsEquipped;
  item.EnchantLevel = data.EnchantLevel;
  item.AugmentBonus = data.AugmentBonus;
  item.AttackElementVal = data.AttackElementVal;
  item.DefAttFire = data.DefAttFire;
  item.DefAttWater = data.DefAttWater;
  item.DefAttWind = data.DefAttWind;
  item.DefAttEarth = data.DefAttEarth;
  item.DefAttHolly = data.DefAttHolly;
  item.DefAttUnholly = data.DefAttUnholly;

  return item;
}
