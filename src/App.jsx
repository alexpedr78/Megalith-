import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import FavoritePage from "./Pages/FavoritePage/FavoritePage";
import MapPage from "./Pages/MapPage/MapPage";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import SideBar from "./Components/SideBar/SideBar";
import DetailsPage from "./Components/DetailsMegalith";
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
    const newTheme = theme === "ligth" ? "dark" : "ligth";
    document.documentElement.className = newTheme;

    setTheme(newTheme);
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <NavBar
        toggleSidebar={toggleSidebar}
        handleChange={handleChange}
        theme={theme}
      />

      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Routes>
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/list/:id" element={<DetailsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
