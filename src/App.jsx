import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
//
import HomePage from "./Pages/HomePage/HomePage";
import FavoritePage from "./Pages/FavoritePage/FavoritePage";
import MapPage from "./Pages/MapPage/MapPage";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import InfosPage from "./Pages/Infos/InfosPage";
import SideBar from "./Components/SideBar/SideBar";
import ListPage from "./Pages/ListPage/ListPage";
import DetailPage from "./Pages/DetailPage/DetailPage.jsx";
import LoginPage from "./Pages/LoginPage/LoginPage.jsx";
import AuthPage from "./Pages/AuthPage/AuthPage.jsx";
import "./App.css";
const LIBRARIES = ["places", "marker"];
function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log("google", apiKey);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Use `useLocation` to track current path
  // const [theme, setTheme] = useState(() => {
  //   const currentTheme = localStorage.getItem("theme");

  //   if (currentTheme) {
  //     document.documentElement.className = currentTheme;
  //     return currentTheme;
  //   }
  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     document.documentElement.className = "dark";
  //     return "dark";
  //   } else {
  //     document.documentElement.className = "light";
  //     return "light";
  //   }
  // });

  // function handleChange() {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   document.documentElement.className = newTheme;
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  // }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={LIBRARIES}>
      <div className="App">
        {location.pathname !== "/" && location.pathname !== "/auth" && (
          <NavBar toggleSidebar={toggleSidebar} />
        )}

        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="main-content">
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/infos" element={<InfosPage />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
          </Routes>
        </div>

        {/* <Footer /> */}
      </div>
    </LoadScript>
  );
}

export default App;
