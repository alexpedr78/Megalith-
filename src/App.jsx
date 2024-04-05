import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import ListPage from "./Pages/ListPage/ListPage";
import MapPage from "./Pages/MapPage/MapPage";
// import ContactPage from "./Pages/ContactPage";
// import CreditPage from "./Pages/CreditPage";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import SideBar from "./Components/SideBar/SideBar";
import DetailsPage from "./Components/DetailsMegalith";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    //console.log("dark");

    if (currentTheme) {
      document.documentElement.className = currentTheme;
      return currentTheme;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.className = "dark";
      return "dark";
    } else {
      document.documentElement.className = "light";
      return "light";
    }
  });
  function handleChange() {
    const newTheme = theme === "ligth" ? "dark" : "ligth";
    document.documentElement.className = newTheme;

    setTheme(newTheme);
  }

  const toggleSidebar = () => {
    //console.log(isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <NavBar
        toggleSidebar={toggleSidebar}
        handleChange={handleChange}
        theme={theme}
      />
      {/* <div className="theme-switch">
        <label id="theme" htmlFor="theme-input">
          <span className="theme-logo">☀️</span>
          <input
            type="checkbox"
            id="theme-input"
            checked={theme === "ligth"}
            onChange={handleChange}
          />
          <span className="theme-toggle"></span>
          <span className="theme-logo">🌙</span>
        </label>
      </div> */}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* <Route path="/credits" element={<CreditPage />} /> */}
        <Route path="/list" element={<ListPage />} />
        <Route path="/list/:id" element={<DetailsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
