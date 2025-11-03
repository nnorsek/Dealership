import React from "react";

const CarBox = ({ cars }) => {
  console.log("Cars from CarBox", cars);

  const handleCarBoxClick = (car) => {
    console.log("Click on ", car);
  };
  return (
    <div className="carbox-container">
      <div className="carbox-list">
        {Array.isArray(cars) && cars.length > 0 ? (
          cars.map((car, index) => (
            <div
              className="carbox-item"
              key={index}
              onClick={() => handleCarBoxClick(car)}
            >
              <div className="car-image">{car.src}</div>
            </div>
          ))
        ) : (
          <p>No cars found.</p>
        )}
      </div>
    </div>
  );
};

export default CarBox;
