import { Car } from "../model/car.model";
import pool from "../db";

export const CarRepository = {
  async getFilters(filters: any): Promise<Car[] | null> {
    const filterConditions = [];
    const values = [];

    if (filters.make) {
      filterConditions.push(`make = $${values.length + 1}`);
      values.push(filters.make);
    }
    if (filters.model) {
      filterConditions.push(`model = $${values.length + 1}`);
      values.push(filters.model);
    }
    if (filters.year) {
      filterConditions.push(`year = $${values.length + 1}`);
      values.push(filters.year);
    }
    if (filters.color) {
      filterConditions.push(`color = $${values.length + 1}`);
      values.push(filters.color);
    }
    if (filters.minPrice) {
      filterConditions.push(`price >= $${values.length + 1}`);
      values.push(filters.minPrice);
    }
    if (filters.maxPrice) {
      filterConditions.push(`price <= $${values.length + 1}`);
      values.push(filters.maxPrice);
    }

    const where =
      filterConditions.length > 0
        ? `WHERE ${filterConditions.join(" AND ")}`
        : "";
    console.log("Where clause: ", where);
    const query = `SELECT * FROM cars ${where}`;
    const cars = await pool.query(query, values);
    return cars.rows;
  },

  async createCar(car: Car): Promise<number> {
    const {
      model,
      make,
      year,
      price,
      condition,
      color,
      miles,
      stock,
      vin,
      image,
    } = car;
    const query = `INSERT INTO cars (model, make, year, price, condition, color, miles, stock, vin, image) VALUES
           ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING ID;`;

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
      image,
    ];
    const result = await pool.query(query, values);
    return result.rows[0].id;
  },

  async findCarByVin(vin: number): Promise<number | null> {
    const result = await pool.query("SELECT * FROM cars WHERE vin = $1", [vin]);

    if (result.rows.length == 0) {
      return null;
    }
    return result.rows[0].id;
  },
};
