import { Route, Routes } from "react-router-dom";
import { useState } from "react";
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
import DetailsPage from "./Pages/DetailsPage/DetailsPage";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    //console.log(isOpen);
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <NavBar toggleSidebar={toggleSidebar} />
      <SideBar isOpen={isOpen} />
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
