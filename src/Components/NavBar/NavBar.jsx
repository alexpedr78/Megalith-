import "./NavBar.css";
import logo from "../../assets/menhir.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import ThemeToggle from "../ThemeToggle";

function NavBar({ toggleSidebar }) {
  return (
    <div className="navbar">
      <div className="button-navbar">
        <button onClick={toggleSidebar}>
          <img src={logo} alt="Logo" className="logo" />
        </button>
      </div>
      <div className="title-link">
        <h3>
          <Link to="/" className="navbar-link">
            MEGALITH
          </Link>
        </h3>
      </div>
      {/* <div className="theme-toggle">
        <ThemeToggle />
      </div> */}
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Englebert&family=MedievalSharp&display=swap');
      </style>
    </div>
  );
}
NavBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default NavBar;
