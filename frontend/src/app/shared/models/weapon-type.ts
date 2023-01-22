import { MercenaryEnum } from "../enums/mercenary-enum";

export type WeaponType = {
  name: string;
  index: number;
  weaponClass: string;
  user: MercenaryEnum;
  slot: number;
}

// Initializer for default values
const defaultWeaponType = {
  name: "",
  index: 0,
  weaponClass: "",
  user: MercenaryEnum.Scout,
  slot: 0
}

/**
 * A generic weapon with default data.
 */
export const Weapon_defaultWeapon: WeaponType = {
  ...defaultWeaponType
}
