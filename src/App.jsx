import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import FavoritePage from "./Pages/FavoritePage/FavoritePage";
import MapPage from "./Pages/MapPage/MapPage";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import SideBar from "./Components/SideBar/SideBar";

import ListPage from "./Pages/ListPage/ListPage";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");

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
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.className = newTheme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App">
      <NavBar
        toggleSidebar={toggleSidebar}
        handleChange={handleChange}
        theme={theme}
      />
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content Wrapper */}
      <div className="main-content">
        <Routes>
          <Route path="/map" element={<MapPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
