import { Car } from "../model/car.model";
import { CarRepository } from "../repository/car.repository";
import { ConditionEnum } from "../model/condition.emun";

export const CarService = {
  async getAll(filters: any): Promise<Car[] | null> {
    return await CarRepository.getFilters(filters);
  },

  async createCar(car: Car): Promise<number> {
    const {
      model,
      make,
      price,
      year,
      vin,
      color,
      condition,
      miles,
      stock,
      image,
    } = car;

    const validConditions = Object.values(ConditionEnum);
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
      image,
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
    console.log("Condition in service: ", condition);
    console.log("Valid conditions: ", validConditions);
    if (!validConditions.includes(condition)) {
      throw new Error("Condition is invalid");
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
