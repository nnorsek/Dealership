import React from "react";
import "./TypeBoxStyle.css";

const TypeBox = (props) => {
  return (
    <div className="typebox-container">
      <img className="icon" src={props.icon} />
      <div className="type">{props.text}</div>
    </div>
  );
};

export default TypeBox;
