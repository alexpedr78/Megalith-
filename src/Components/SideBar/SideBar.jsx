import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import PropTypes from "prop-types";

function SideBar({ isOpen }) {
  return (
    <div className={`side-bar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/list">List</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Valider la prop isOpen
};

export default SideBar;
