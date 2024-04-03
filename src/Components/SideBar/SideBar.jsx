import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import PropTypes from "prop-types";

function SideBar({ isOpen }) {
  const [linkClicked, setLinkClicked] = useState(false);

  // Fonction pour gérer le clic sur un lien
  const handleLinkClick = () => {
    setLinkClicked(true); // Met à jour l'état pour indiquer qu'un lien a été cliqué
  };

  // Redéfinit isOpen à false lorsque linkClicked devient true
  if (linkClicked && isOpen) {
    isOpen = false;
  }

  return (
    <div className={`side-bar ${isOpen ? "open" : ""}`}>
      <ul>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/map" onClick={handleLinkClick}>
            Map
          </Link>
        </li>
        <li>
          <Link to="/list" onClick={handleLinkClick}>
            List
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>
            About
          </Link>
        </li>
      </ul>
    </div>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Valider la prop isOpen
};

export default SideBar;
