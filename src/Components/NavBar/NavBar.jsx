import "./NavBar.css";
import logo from "../../assets/menhir.png";
import { auth } from "../../../firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function NavBar({ toggleSidebar, handleChange, theme }) {
  const [user, setUser] = useState(null); // Track user state
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to auth changes to set user state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state after logout
      navigate("/"); // Redirect to home page or login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="button-navbar">
        <button onClick={toggleSidebar}>
          <img src={logo} alt="Logo" className="logo" />
        </button>
      </div>
      <div className="nav-links">
        {/* Add your usual links here */}
        {user ? (
          // Show Logout button only if user is logged in
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/auth")}>Login</button>
        )}
      </div>
      {/* Optional Theme Switch */}
      {/* <div className="theme-switch">
        <label id="theme" htmlFor="theme-input">
          <span className="theme-logo">🌙</span>
          <input
            type="checkbox"
            id="theme-input"
            checked={theme === "light"}
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
