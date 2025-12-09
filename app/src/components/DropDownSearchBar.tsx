import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

// Props interface
interface DropDownProps {
  buttonText: string;
  items?: string[];
  onSelect?: (value: string | null) => void;
  resetTrigger?: any; // Can be number or string to trigger reset
}

const DropDown: React.FC<DropDownProps> = ({
  buttonText,
  items = [],
  onSelect,
  resetTrigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(buttonText);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string) => {
    const value = item === buttonText ? null : item;
    setSelectedOption(item);
    setIsOpen(false);
    if (onSelect) onSelect(value);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset selected option when resetTrigger changes
  useEffect(() => {
    setSelectedOption(buttonText);
  }, [resetTrigger, buttonText]);

  return (
    <div
      className="relative flex items-center cursor-pointer"
      ref={dropdownRef}
    >
      <button
        className="bg-white w-[165px] px-1 py-1 border-none text-left"
        onClick={toggleDropDown}
      >
        {selectedOption || buttonText}
      </button>

      <div className="ml-2">
        <FontAwesomeIcon
          icon={isOpen ? faAngleUp : faAngleDown}
          onClick={toggleDropDown}
        />
      </div>

      {isOpen && (
        <ul className="absolute top-[35px] bg-white w-[190px] max-h-[200px] p-1 font-poppins border border-gray-300 z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {items.map((item, index) => (
            <li
              key={item || index}
              className="cursor-pointer px-4 py-2 border-b last:border-b-0 hover:bg-gray-200 transition-colors duration-200"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
