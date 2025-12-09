import React from "react";
import { Car } from "../types/Car";

interface CarBoxProps {
  cars: Car[];
}

const CarBox: React.FC<CarBoxProps> = ({ cars }) => {
  const handleCarBoxClick = (car: Car) => {
    console.log("Clicked car:", car);
  };
  console.log("Cars: ", cars);
  const formatMiles = (miles: number) => {
    if (miles >= 1e3) return (miles / 1e3).toFixed(1) + "k";
    return miles;
  };

  const formatPrice = (price: number) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  if (!cars.length) {
    return <p className="text-center text-gray-500 mt-4">No cars found.</p>;
  }
  return (
    <div className="carbox-container px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-40">
        {cars.map((car) => (
          <div
            key={car.id}
            className="cursor-pointer overflow-hidden hover:shadow-lg hover:border hover:rounded-lg transition-shadow duration-200 w-80"
            onClick={() => handleCarBoxClick(car)}
          >
            <img
              src={`https://car-photo-bucket.s3.us-east-2.amazonaws.com/${car.image}`}
              alt={`${car.make} ${car.model}`}
              className="w-full h-54 object-cover rounded-2xl p-2"
            />
            <div className="flex">
              <p className="text-sm pl-5 text-gray-500">
                {car.condition} &bull;
              </p>
              <p className="text-sm pl-1 text-gray-500">
                {formatMiles(car.miles)} Mi. &bull;
              </p>
              <p className="text-sm pl-1 text-gray-500">{car.year}</p>
            </div>
            <p className="font-bold pt-1 pl-5 text-red-500">
              {car.make} {car.model}
            </p>
            <p className="font-medium text-xl pt-6 pl-5">
              ${formatPrice(car.price)}
            </p>
            <div className="p-5 text-center">
              <button className="border rounded-lg text-white text-lg py-3 px-20 bg-black hover:bg-red-800">
                Inquire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarBox;
