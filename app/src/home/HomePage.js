import React from "react";
import "./HomePageStyle.css";
import SelectSearch from "../components/SelectSearch/SelectSearch";
import TypeBox from "../components/TypeBox/TypeBox";
import sedan from "../images/sedan-car-13350.svg";

const typebox = [
  { id: 1, text: "Sedan", icon: sedan },
  { id: 2, text: "SUV", icon: sedan },
  { id: 3, text: "Hatchback", icon: sedan },
  { id: 4, text: "Coupe", icon: sedan },
  { id: 5, text: "Hybrid", icon: sedan },
  { id: 6, text: "Truck", icon: sedan },
  { id: 7, text: "Van", icon: sedan },
  { id: 8, text: "Electric", icon: sedan },
];

const HomePage = () => {
  return (
    <div>
      <div className="hero-container">
        <div className="home-text">
          <p>Find cars for sale and for rent near you</p>
          <h1>Find Your Dream Car</h1>
        </div>
        <SelectSearch />
      </div>
      <div className="browse-container">
        <h1 className="browse-by-type">Browse by Type</h1>
        <div className="typebox">
          {typebox.map((data) => (
            <TypeBox key={data.id} text={data.text} icon={data.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
