import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DropDown from "./DropDownSearchBar";

interface Car {
  make: string;
  model: string;
  condition: string;
  price: string | number;
  year: number;
}

const SelectSearch: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<Record<string, (string | number)[]>>({
    make: [],
    model: [],
    condition: [],
    price: [],
    year: [],
  });
  const [selected, setSelected] = useState<
    Record<string, string | number | null>
  >({
    make: null,
    model: null,
    condition: null,
    price: null,
    year: null,
  });

  const navigate = useNavigate();

  // Fetch car data once
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("http://localhost:3000/car/all");
        const data: Car[] = res.data.cars;
        setCars(data);
        setFilteredCars(data);
        updateFilters(data, {});
      } catch (err) {
        console.error("Failed to fetch cars", err);
      }
    };
    fetchCars();
  }, []);

  // Update the type to allow null
  const handleFilterChange = (field: string, value: string | number | null) => {
    const newSelected = { ...selected, [field]: value };
    setSelected(newSelected);

    // Filter cars
    const filtered = cars.filter((car) =>
      Object.entries(newSelected).every(
        ([key, val]) => val === null || car[key as keyof Car] === val
      )
    );
    setFilteredCars(filtered);

    // Update dropdown options based on current selections
    updateFilters(cars, newSelected);
  };

  // Helper to compute available dropdown options
  const updateFilters = (
    allCars: Car[],
    selectedFilters: Record<string, string | number | null>
  ) => {
    const newFilters: Record<string, (string | number)[]> = {};
    (["make", "model", "condition", "price", "year"] as const).forEach(
      (key) => {
        newFilters[key] = Array.from(
          new Set(
            allCars
              .filter((car) =>
                Object.entries(selectedFilters).every(
                  ([k, v]) => k === key || !v || car[k as keyof Car] === v
                )
              )
              .map((car) => car[key])
          )
        );
      }
    );
    setFilters(newFilters);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/carlist", { state: { value: selected } });
  };

  return (
    <div className="flex justify-center pt-10">
      <div className="relative flex items-center px-4 py-2 bg-white rounded-[35px]">
        {(["condition", "model", "make", "year", "price"] as const).map(
          (field, idx) => (
            <React.Fragment key={field}>
              <DropDown
                onSelect={(val) =>
                  handleFilterChange(
                    field,
                    val === "Any"
                      ? null
                      : field === "year" || field === "price"
                      ? Number(val)
                      : val
                  )
                }
                items={["Any", ...filters[field].map(String)]}
                buttonText={`Any ${
                  field.charAt(0).toUpperCase() + field.slice(1)
                }`}
              />
              {idx < 4 && (
                <hr className="mx-2 h-10 border-none bg-gray-300 w-[1px]" />
              )}
            </React.Fragment>
          )
        )}

        <button
          onClick={handleSubmit}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-0 border-none bg-none cursor-pointer"
        >
          <FontAwesomeIcon
            icon={faCircle}
            className="text-[#037ffc] hover:text-[#0060bf] transition-colors duration-150"
            size="2xl"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm pointer-events-none"
          />
        </button>
      </div>
    </div>
  );
};

export default SelectSearch;
