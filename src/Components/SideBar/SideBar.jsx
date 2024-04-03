import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import PropTypes from "prop-types";

function SideBar({ isOpen, setIsOpen }) {
  // const [clickedOutside, setClickedOutside] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.className === "logo") {
        return;
      }
      if (!ref.current.contains(event.target)) {
        // console.log(event.target.className === "logo");
        // console.log("outside");
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className={`side-bar ${isOpen ? "open" : ""}`}>
      <div>
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
    </div>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Valider la prop isOpen
};

export default SideBar;
