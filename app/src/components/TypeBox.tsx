import React from "react";

interface TypeBoxProps {
  icon: string;
  text: string;
}

const TypeBox: React.FC<TypeBoxProps> = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center border border-gray-300 p-1.5 rounded-lg font-poppins cursor-pointer transition duration-200 ease-in-out hover:bg-gray-200">
      <img className="w-[110px] h-[90px]" src={icon} alt={text} />
      <div className="flex items-center text-sm pb-1.5 font-medium">{text}</div>
    </div>
  );
};

export default TypeBox;
