//import React, { useState } from "react";
//import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../assets/menhir.png";

// function NavBar() {
//   // const [selectValue, setSelectValue] = useState("");

//   // function handleChange(event) {
//   //   const Value = event.target.value;
//   //   setSelectValue(Value);
//   // }

//   return (
//     <div className="navbar">
//       {/* <select
//         onChange={handleChange}
//         name="select"
//         value={selectValue}
//         id="menuSelect"
//       >
//         <option value="select">Menu</option>
//         <option value="map">Map</option>
//         <option value="list">List</option>
//         <option value="about">About</option>
//       </select> */}
//       <img src={logo} alt="Logo" className="logo" />
//       <h3>MEGALITH</h3>
//       {/* <nav>
//         <Link to="/map">Map</Link>
//         <Link to="/list">List</Link>
//         <Link to="/about">About</Link>
//       </nav> */}
//     </div>
//   );
// }
import "./NavBar.css";
function NavBar({ toggleSidebar }) {
  return (
    <div className="navbar">
      <div>
        <h3>MEGALITH</h3>
      </div>
      <div className="button-navbar">
        <button onClick={toggleSidebar}>
          <img src={logo} alt="Logo" className="logo" />
        </button>
      </div>
    </div>
  );
}
export default NavBar;
