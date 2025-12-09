import type { Request, Response } from "express";
import { CarService } from "../service/car.service";
export const CarController = {
  async getAll(req: Request, res: Response) {
    try {
      const { make, model, year, color, minPrice, maxPrice } = req.query;

      const filters = {
        make,
        model,
        year: year ? Number(year) : undefined,
        color: color ? color : undefined,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
      };
      const cars = await CarService.getAll(filters);
      if (cars) {
        return res.status(200).json({ cars });
      }
    } catch (error: any) {
      console.log("Controller Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async createCar(req: Request, res: Response) {
    try {
      const result = await CarService.createCar(req.body);

      if (result) {
        return res.status(201).json({ message: "Car created", id: result });
      }
    } catch (error: any) {
      if (
        error.message === "Certain fields are mising" ||
        error.message === "VIN has to be unique" ||
        error.message === "VIN is invalid" ||
        error.messaage === "Price has to be greater than 0" ||
        error.message === "Miles has to be equal to or greater than 0" ||
        error.message === "Condition is invalid"
      ) {
        return res.status(400).json({ message: error.message });
      } else {
        return res
          .status(500)
          .json({ message: "Internal Server Error: " + error });
      }
    }
  },
};
