import { EffectEnum } from "../enums/effect-enum";
import { ValueTypeEnum } from "../enums/valuetype-enum";

export type AttributeType = {
  id: number;
  name: string;
  effect: EffectEnum;
  description: string;
  valueType: ValueTypeEnum;
  hidden: boolean;
  customValue?: number;
}
