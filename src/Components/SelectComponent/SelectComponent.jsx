import React from "react";
import { useState } from "react";
import "./SelectComponent.css";

function SelectComponent({
  label,
  options,
  value,
  onChange,
  addToggle,
  setAddToggle,
}) {
  return (
    <div className="selectComponent">
      <label className="selectLabel">{label}</label>
      <select className="selectInput" value={value} onChange={onChange}>
        <option disabled value="-1">
          {label}
        </option>
        <option value="-1">All</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComponent;
