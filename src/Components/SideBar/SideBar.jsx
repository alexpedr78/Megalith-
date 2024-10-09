import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideBar({ isOpen, setIsOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Ensure the click outside functionality is triggered
      if (event.target.className === "logo") {
        return;
      }
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={ref}
      className={`side-bar ${isOpen ? "open" : ""}`}
      aria-expanded={isOpen ? "true" : "false"}
    >
      <div className="side-bar-content">
        <ul>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/map" onClick={() => setIsOpen(false)}>
              APP
            </Link>
          </li>
          <li>
            <Link to="/list" onClick={() => setIsOpen(false)}>
              ADMIN PAGE
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
