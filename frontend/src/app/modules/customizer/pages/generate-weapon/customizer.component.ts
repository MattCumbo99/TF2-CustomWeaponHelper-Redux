import { Component } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { CustomWeaponModel } from "../../../../shared/models/customweapon-model";
import { QualityEnum } from "../../../../shared/enums/quality-enum";
import { SlotEnum } from "../../../../shared/enums/slot-enum";
import { AttributeType } from "../../../../shared/models/attribute-type";
import { EffectEnum } from "../../../../shared/enums/effect-enum";
import { ValueTypeEnum } from "../../../../shared/enums/valuetype-enum";

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.sass']
})
export class CustomizerComponent {

  // Sample data
  attributes: AttributeType[] = [
    { id: 1, name: "Damage Penalty", description: "%s1% damage penalty", effect: EffectEnum.Negative, customValue: 0, valueType: ValueTypeEnum.Percentage, hidden: false }
  ];

  attributeTableColumns: string[] = ['id', 'name', 'description'];

  QualityEnum = QualityEnum;
  SlotEnum = SlotEnum;

  customWeapon: CustomWeaponModel;

  weaponForm = new FormGroup({
    weaponName: new FormControl(),
    weaponPluginIndex: new FormControl(9999),
    weaponClass: new FormControl(),
    weaponIndex: new FormControl(0),
    weaponSlot: new FormControl(SlotEnum.Primary),
    weaponQuality: new FormControl(QualityEnum.Normal),
    weaponLevel: new FormControl(1),
    weaponAmmo: new FormControl(0),

    phpCode: new FormControl(),
  });

  constructor() {
    this.customWeapon = new CustomWeaponModel();
    this.updatePHPCode();
  }

  changedWeaponPluginIndex(data: number) {
    this.customWeapon.pluginIndex = data;
    this.updatePHPCode();
  }

  changedWeaponClass(data: string) {
    this.customWeapon.weaponClass = data;
    this.updatePHPCode();
  }

  changedWeaponIndex(data: number) {
    this.customWeapon.weaponIndex = +data;
    this.updatePHPCode();
  }

  changedWeaponSlot(data: number) {
    this.customWeapon.weaponSlot = data;
    this.updatePHPCode();
  }

  changedWeaponQuality(data: number) {
    this.customWeapon.itemQuality = data;
    this.updatePHPCode();
  }

  changedWeaponLevel(data: number) {
    this.customWeapon.level = data;
    this.updatePHPCode();
  }

  changedWeaponAmmo(data: number) {
    this.customWeapon.ammo = data;
    this.updatePHPCode();
  }

  private updatePHPCode(): void {
    this.weaponForm.controls.phpCode.setValue(this.customWeapon.phpCode);
  }
}
