import React, { useState, useRef, useEffect } from "react";
import "./DropDownSearchBarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const DropDown = ({ buttonText, items = [], onSelect, resetTrigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  const handleItemClick = (item) => {
    const value = item == buttonText ? null : item;
    setSelectedOption(item);
    setIsOpen(false);
    if (onSelect) {
      onSelect(value);
    }
  };

  const toggleDropDown = () => setIsOpen(!isOpen);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setSelectedOption(buttonText);
  }, [resetTrigger]);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropDown}>
        {selectedOption || buttonText}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {(items || []).map((item, index) => (
            <li
              className="dropdown-item"
              key={item || index}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      {!isOpen ? (
        <FontAwesomeIcon icon={faAngleDown} onClick={toggleDropDown} />
      ) : (
        <FontAwesomeIcon icon={faAngleUp} onClick={toggleDropDown} />
      )}
    </div>
  );
};

export default DropDown;
