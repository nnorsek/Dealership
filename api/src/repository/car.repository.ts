import { Car } from "../model/car.model";
import pool from "../db";

export const CarRepository = {
  async getAllCars(): Promise<Car[] | null> {
    try {
      const cars = await pool.query("SELECT * FROM cars");
      return cars.rows;
    } catch (error: any) {
      console.error("DB ERROR: ", error);
      throw error;
    }
  },

  async createCar(car: Car): Promise<number> {
    try {
      const { model, make, year, price, condition, color, miles, stock, vin } =
        car;
      const query = `INSERT INTO cars (model, make, year, price, condition, color, miles, stock, vin) VALUES
           ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING ID;`;

      const values = [
        model,
        make,
        year,
        price,
        condition,
        color,
        miles,
        stock,
        vin,
      ];
      const result = await pool.query(query, values);
      return result.rows[0].id;
    } catch (error: any) {
      throw error;
    }
  },

  async findCarByVin(vin: number): Promise<number | null> {
    try {
      const result = await pool.query("SELECT * FROM cars WHERE vin = $1", [
        vin,
      ]);

      if (result.rows.length == 0) {
        return null;
      }
      return result.rows[0].id;
    } catch (error: any) {
      throw error;
    }
  },
};
