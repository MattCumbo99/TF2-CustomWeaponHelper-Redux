import { MercenaryEnum } from "../enums/mercenary-enum";

export type Weapon = {
  name: string;
  index: number;
  weaponClass: string;
  user: MercenaryEnum;
  slot: number;
}
