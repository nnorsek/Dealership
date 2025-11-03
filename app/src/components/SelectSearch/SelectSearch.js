import React, { useEffect, useState } from "react";
import "./SelectSearchStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../DropDownSearchBar/DropDownSearchBar";
import { useNavigate } from "react-router-dom";

const SelectSearch = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    make: [],
    model: [],
    car_condition: [],
    price: [],
    year: [],
  });

  const [selectedFilters, setSelectedFilters] = useState({
    make: "",
    model: "",
    price: "",
    car_condition: "",
    year: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:8080/cars/all");
        if (!response.ok) {
          throw new Error(`HTTP Error!, ${response.status}`);
        }
        const data = await response.json();
        setCars(data);
        const make = [...new Set(data.map((car) => car.make))];
        const car_condition = [
          ...new Set(data.map((car) => car.car_condition)),
        ];
        const year = [...new Set(data.map((car) => car.year))];
        const model = [...new Set(data.map((car) => car.model))];
        const price = [...new Set(data.map((car) => car.price))];

        setFilters({
          make: make,
          car_condition: car_condition,
          year: year,
          model: model,
          price: price,
        });
      } catch (e) {
        console.error("Failed to fetch all car details", e);
      }
    };

    fetchCars();
  }, []);

  const handleFilterChange = (field, value) => {
    const newSelected = { ...selectedFilters, [field]: value };
    setSelectedFilters(newSelected);

    // Filter the cars
    const filtered = cars.filter((car) => {
      return (
        (!newSelected.make || car.make === newSelected.make) &&
        (!newSelected.model || car.model === newSelected.model) &&
        (!newSelected.car_condition ||
          car.car_condition === newSelected.car_condition) &&
        (!newSelected.price || car.price === newSelected.price) &&
        (!newSelected.year || car.year === newSelected.year)
      );
    });
    setFilteredCars(filtered);

    // Update the available dropdown values based on filtered cars
    setFilters({
      make: [...new Set(filtered.map((c) => c.make))],
      model: [...new Set(filtered.map((c) => c.model))],
      price: [...new Set(filtered.map((c) => c.price))],
      car_condition: [...new Set(filtered.map((c) => c.car_condition))],
      year: [...new Set(filtered.map((c) => c.year))],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting Filters: ${JSON.stringify(filters)}`);

    navigate(`/carlist`, { state: { value: selectedFilters } });
  };

  const resetFilters = () => {
    console.log("reset filters");

    setSelectedFilters({
      make: null,
      model: null,
      car_condition: null,
      year: null,
      price: null,
    });

    setFilteredCars(cars);

    setFilters({
      make: [...new Set(cars.map((car) => car.make))],
      car_condition: [...new Set(cars.map((car) => car.car_condition))],
      year: [...new Set(cars.map((car) => car.year))],
      model: [...new Set(cars.map((car) => car.model))],
      price: [...new Set(cars.map((car) => car.price))],
    });

    setResetCounter((prev) => prev + 1);
  };

  return (
    <div className="selectSearch-container">
      <div className="form-container">
        <DropDown
          onSelect={(value) => handleFilterChange("car_condition", value)}
          items={filters.car_condition}
          buttonText={"Any Condition"}
          resetTrigger={resetCounter}
        />

        <hr />
        <DropDown
          onSelect={(value) => handleFilterChange("model", value)}
          items={filters.model}
          buttonText={"Any Model"}
          resetTrigger={resetCounter}
        />
        <hr />
        <DropDown
          onSelect={(value) => handleFilterChange("make", value)}
          items={filters.make}
          buttonText={"Any Make"}
          resetTrigger={resetCounter}
        />
        <hr />
        <DropDown
          onSelect={(value) => handleFilterChange("year", value)}
          items={filters.year}
          buttonText={"Any Year"}
          resetTrigger={resetCounter}
        />
        <hr />
        <div className="price-button">
          <DropDown
            onSelect={(value) => handleFilterChange("price", value)}
            items={filters.price}
            buttonText={"Any Price"}
            resetTrigger={resetCounter}
          />
        </div>
        <div className="submit-button">
          <button
            onClick={handleSubmit}
            className="fa-layers fa-fw fa-3x"
            style={{
              border: "none",
              background: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faCircle} className="circle-icon" />
            <FontAwesomeIcon
              icon={faSearch}
              color="white"
              style={{ pointerEvents: "none", fontSize: "medium" }}
            />
          </button>
          <button className="reset-filters" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectSearch;
