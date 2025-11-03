import React from "react";
import "./NavbarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faPhone,
  faAngleDown,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo">
        <FontAwesomeIcon icon={faCar} />
        <p>Auto Sales</p>
      </div>
      <div className="phone-number">
        {" "}
        <FontAwesomeIcon icon={faPhone} />
        <p>+21 435-543-1000</p>
      </div>
      <ul className="horizontal-list">
        <li className="home-dropdown">
          Home <FontAwesomeIcon icon={faAngleDown} />
        </li>
        <li className="listing-dropdown">
          Listing <FontAwesomeIcon icon={faAngleDown} />{" "}
        </li>
        <li>
          Blog <FontAwesomeIcon icon={faAngleDown} />
        </li>
        <li>
          Pages <FontAwesomeIcon icon={faAngleDown} />
        </li>
        <li>About</li>
        <li>Contact</li>
        <li>
          <FontAwesomeIcon icon={faCircleUser} /> Sign in
        </li>
      </ul>
      <div className="submit-listing">
        <p>Submit Listing</p>
      </div>
    </nav>
  );
};

export default Navbar;
