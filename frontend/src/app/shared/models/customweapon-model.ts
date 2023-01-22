import { WeaponType, Weapon_defaultWeapon } from "./weapon-type";
import { QualityEnum } from "../enums/quality-enum";
import { AttributeType } from "./attribute-type";

/**
 * Representation of defined custom weapon data.
 */
export class CustomWeaponModel {

  private physicalWeaponData: WeaponType;

  /**
   * Index the weapon will be set as (/givew @me thisnumber).
   *
   * @default 9999
   */
  public pluginIndex: number = 9999;

  /**
   * Item quality, as in strange, vintage, unique, etc.
   *
   * @default Normal (1)
   */
  public itemQuality: number = QualityEnum.Normal;

  /**
   * The cosmetic level of the item.
   *
   * @default 1
   */
  public level: number = 1;

  /**
   * The attributes of the weapon represented by a map.
   *
   * KEY = The ID of the attribute
   * <br>
   * VALUE = The provided custom value to provide the attribute
   */
  public attributes: Map<number, number> = new Map<number, number>();

  /**
   * Initial ammo to set for that weapon when it's given.
   *
   * @default 0
   */
  public ammo: number = 0;

  // Optional parameters
  /**
   * The world model of the weapon.
   */
  public worldModel?: string;

  /**
   * Used to attach a model to the view model of the weapon. Try not to use a model
   * that already has hands on it (so use the w_model/c_model if you can).
   */
  public viewModel?: string;

  constructor(weapon?: WeaponType) {
    if (weapon != null) {
      this.physicalWeaponData = weapon;
    } else {
      this.physicalWeaponData = Weapon_defaultWeapon;
    }
  }

  get weaponClass(): string {
    return this.physicalWeaponData.weaponClass;
  }

  set weaponClass(weaponClass: string) {
    this.physicalWeaponData.weaponClass = weaponClass;
  }

  get weaponIndex(): number {
    return this.physicalWeaponData.index;
  }

  set weaponIndex(index: number) {
    this.physicalWeaponData.index = index;
  }

  get weaponSlot(): number {
    return this.physicalWeaponData.slot;
  }

  set weaponSlot(slot: number) {
    this.physicalWeaponData.slot = slot;
  }

  /**
   * Gets this weapon's data as usable PHP code formatted as a string.
   */
  get phpCode(): string {
    let code = ['\t"' + this.pluginIndex + '"\n', '\t{\n'];

    code.push(
      this.phpProperty("classname", this.physicalWeaponData.weaponClass),
      this.phpProperty("index", this.physicalWeaponData.index),
      this.phpProperty("slot", this.physicalWeaponData.slot),
      this.phpProperty("quality", this.itemQuality),
      this.phpProperty("level", this.level),
      this.phpProperty("attribs", this.weaponAttributesPHP),
      this.phpProperty("ammo", this.ammo)
    );

    // Include the optional properties, should they be provided
    if (this.worldModel !== undefined) {
      code.push(this.phpProperty("model", this.worldModel));
    }
    if (this.viewModel !== undefined) {
      code.push(this.phpProperty("viewmodel", this.viewModel));
    }

    // Closing bracket
    code.push('\t}\n');

    return code.join('');
  }

  private phpProperty(name: string, value: number | string): string {
    return '\t\t"' + name + '"\t"' + value + '"\n';
  }

  /**
   * Gets the custom weapon's attributes in string format.
   *
   * @return "index1 ; value1 ; index2 ; value2 ..."
   */
  private get weaponAttributesPHP(): string {
    let attrib = "";

    for (let [index, value] of this.attributes) {
      if (attrib !== "") {
        attrib += " ; ";
      }
      attrib += index + " ; " + value;
    }

    return attrib;
  }
}
