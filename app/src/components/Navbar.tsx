import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faPhone,
  faAngleDown,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  return (
    <nav className="relative flex items-center px-5 py-2 bg-white shadow-md font-poppins">
      {/* Logo */}
      <div
        className="flex items-center pr-10 hover:cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <FontAwesomeIcon icon={faCar} className="mr-2" />
        <p className="text-base font-semibold">Auto Sales</p>
      </div>

      {/* Phone Number */}
      <div className="flex items-center text-sm mr-10">
        <FontAwesomeIcon icon={faPhone} className="mr-1" />
        <p>+21 435-543-1000</p>
      </div>

      {/* Horizontal Navigation */}
      <ul className="absolute left-1/2 transform -translate-x-1/2 flex list-none p-0 m-0 space-x-6">
        <li className="flex items-center cursor-pointer">
          Home <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
        </li>
        <li className="flex items-center cursor-pointer">
          Listing <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
        </li>
        <li className="flex items-center cursor-pointer">
          Blog <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
        </li>
        <li className="flex items-center cursor-pointer">
          Pages <FontAwesomeIcon icon={faAngleDown} className="ml-1" />
        </li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Contact</li>
        <li className="flex items-center cursor-pointer">
          <FontAwesomeIcon icon={faCircleUser} className="mr-1" /> Sign in
        </li>
      </ul>

      {/* Submit Listing */}
      <div className="ml-auto border border-gray-400 rounded-lg px-5 py-1 text-sm cursor-pointer">
        <p>Submit Listing</p>
      </div>
    </nav>
  );
};

export default Navbar;
