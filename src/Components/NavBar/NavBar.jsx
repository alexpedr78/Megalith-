import "./NavBar.css";
import logo from "../../assets/menhir.png";
import PropTypes from "prop-types";

function NavBar({ toggleSidebar }) {
  return (
    <div className="navbar">
      <div className="button-navbar">
        <button onClick={toggleSidebar}>
          <img src={logo} alt="Logo" className="logo" />
        </button>
      </div>
      <div>
        <h3>MEGALITH</h3>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Englebert&family=MedievalSharp&display=swap')
        </style>
      </div>
    </div>
  );
}
NavBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};
export default NavBar;
