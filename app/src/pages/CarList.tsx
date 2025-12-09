import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CarBox from "../components/CarBox";
import { Car } from "../types/Car";

interface Filters {
  make: string;
  model: string;
  condition: string;
  price: string | number;
  year: string | number;
}

const CarList: React.FC = () => {
  const location = useLocation();
  const state = location.state as { value: Filters } | undefined;
  const [cars, setCars] = useState<Car[]>([]);

  const params = new URLSearchParams();
  if (state?.value.condition) params.append("condition", state.value.condition);
  if (state?.value.price) params.append("price", state.value.price.toString());
  if (state?.value.model) params.append("model", state.value.model);
  if (state?.value.make) params.append("make", state.value.make);
  if (state?.value.year) params.append("year", state.value.year.toString());

  useEffect(() => {
    const fetchFilteredCars = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/car/all?${params.toString()}`
        );
        if (!response.ok) {
          throw new Error(`HTTP Error! Status Code: ${response.status}`);
        }
        const data = await response.json();
        setCars(data.cars);
      } catch (e) {
        console.error("Fetch Filtered Cars failed", e);
      }
    };

    fetchFilteredCars();
  }, [params.toString()]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {cars.length > 0 ? (
        <CarBox cars={cars} />
      ) : (
        <p className="text-center text-gray-500">No cars found.</p>
      )}
    </div>
  );
};

export default CarList;
