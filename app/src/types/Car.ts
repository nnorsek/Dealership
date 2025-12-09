export interface Car {
  id: string | number;
  make: string;
  model: string;
  condition: string;
  price: number;
  year: number;
  color: string;
  vin: string;
  image: string;
  miles: number;
  stock: string;
  [key: string]: any;
}
