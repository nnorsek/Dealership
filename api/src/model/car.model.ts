import { condition } from "./condition.emun";

export interface Car {
  id: number;
  model: string;
  make: string;
  year: number;
  price: number;
  condition: condition;
  color: string;
  miles: number;
  stock: string;
  vin: number;
}
