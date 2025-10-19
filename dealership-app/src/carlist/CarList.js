import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CarBox from "../components/CarBox/CarBox";

const CarList = () => {
  const { state } = useLocation();
  const [cars, setCars] = useState([]);
  console.log("State", state.value.car_condition);

  const params = new URLSearchParams();

  if (state.value.car_condition != "")
    params.append("carCondition", state.value.car_condition);
  if (state.value.price != "") params.append("price", state.value.price);
  if (state.value.model != "") params.append("model", state.value.model);
  if (state.value.make != "") params.append("make, state.value.make");
  if (state.value.year != "") params.append("year", state.value.year);
  useEffect(() => {
    const fetchFilteredCars = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/cars/search?${params.toString()}`
        );
        //http://localhost:8080/cars/search?price=22000
        console.log(response);
        if (!response.ok) {
          throw new Error("HTTP Error ! Status Code", response.status);
        }
        const data = await response.json();
        setCars(data);
        console.log("Cars from CarList", cars);
      } catch (e) {
        console.error("Fetch Filtered Cars failed on catch", e);
      }
    };

    fetchFilteredCars();
  }, []);

  console.log("cars", cars);
  return (
    <div>
      <CarBox cars={cars} />
    </div>
  );
};

export default CarList;
