import React from "react";
import SelectSearch from "../components/SelectSearch";
import TypeBox from "../components/TypeBox";
import sedan from "../images/sedan-car-13350.svg";

// Type definition for typebox items
interface TypeBoxData {
  id: number;
  text: string;
  icon: string;
}

const typebox: TypeBoxData[] = [
  { id: 1, text: "Sedan", icon: sedan },
  { id: 2, text: "SUV", icon: sedan },
  { id: 3, text: "Hatchback", icon: sedan },
  { id: 4, text: "Coupe", icon: sedan },
  { id: 5, text: "Hybrid", icon: sedan },
  { id: 6, text: "Truck", icon: sedan },
  { id: 7, text: "Van", icon: sedan },
  { id: 8, text: "Electric", icon: sedan },
];

const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-[#D2E6F8]">
      {/* Hero Section */}
      <div
        className="items-center justify-center h-[120vh] w-full relative z-10 pt-16 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${require("../images/audi-home.png")})`,
        }}
      >
        <div className="flex flex-col items-center text-center">
          <p className="font-poppins">
            Find cars for sale and for rent near you
          </p>
          <h1 className="font-poppins text-[54px] font-semibold tracking-[1.4px]">
            Find Your Dream Car
          </h1>
        </div>
        <SelectSearch />
      </div>

      {/* Browse by Type */}
      <div className="bg-white relative z-20 -mt-[340px] h-[300px] text-black flex flex-col items-center">
        <h1 className="font-poppins pt-[110px] font-medium text-center">
          Browse by Type
        </h1>
        <div className="flex justify-center items-center gap-8 p-2">
          {typebox.map((data) => (
            <TypeBox key={data.id} text={data.text} icon={data.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
