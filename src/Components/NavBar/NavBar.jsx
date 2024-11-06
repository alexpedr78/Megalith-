import "./NavBar.css";
import logo from "../../assets/menhir.png";

function NavBar({ toggleSidebar, handleChange, theme }) {
  return (
    <div className="navbar">
      <div className="button-navbar">
        <button onClick={toggleSidebar}>
          <img src={logo} alt="Logo" className="logo" />
        </button>
      </div>
      {/* <div className="theme-switch">
        <label id="theme" htmlFor="theme-input">
          <span className="theme-logo">🌙</span>
          <input
            type="checkbox"
            id="theme-input"
            checked={theme === "ligth"}
            onChange={handleChange}
          />
          <span className="theme-toggle"></span>
          <span className="theme-logo">☀️</span>
        </label>
      </div> */}
    </div>
  );
}

export default NavBar;
