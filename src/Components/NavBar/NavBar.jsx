//import React from "react";
import "./NavBar.css";
import logo from "../../assets/png-transparent-rock-stone-removebg-preview.png"; // Importez votre image

function NavBar() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <h3>MEGALITH</h3>
    </div>
  );
}

export default NavBar;
