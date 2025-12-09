import { ConditionEnum } from "./condition.emun";

export interface Car {
  id: number;
  model: string;
  make: string;
  year: number;
  price: number;
  condition: ConditionEnum;
  color: string;
  miles: number;
  stock: string;
  vin: number;
  image: string;
}
