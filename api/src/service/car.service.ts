import { Car } from "../model/car.model";
import { CarRepository } from "../repository/car.repository";

export const CarService = {
  async getAll(): Promise<Car[] | null> {
    return await CarRepository.getAllCars();
  },

  async createCar(car: Car): Promise<number> {
    const { model, make, price, year, vin, color, condition, miles, stock } =
      car;
    const required = {
      model,
      make,
      year,
      vin,
      color,
      condition,
      miles,
      stock,
      price,
    };

    for (const [key, value] of Object.entries(required)) {
      if (value == null) {
        throw new Error(`${key} is missing`);
      }
    }
    const exists = await CarRepository.findCarByVin(vin);
    if (exists == vin) {
      throw new Error("VIN has to be unique");
    }

    if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(String(vin))) {
      throw new Error("VIN is invalid");
    }

    if (price < 0) {
      throw new Error("Price has to be greater than 0");
    }

    if (miles < 0) {
      throw new Error("Miles has to be equal to or greater than 0");
    }

    const result = await CarRepository.createCar(car);
    return result;
  },
};
