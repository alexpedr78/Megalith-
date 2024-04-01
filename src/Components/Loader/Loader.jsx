import React from "react";
import "./Loader.css";
import menhirImage from "../../assets/menhir.png";

const Loader = () => (
  <div className="loader">
    <img src={menhirImage} alt="Menhir" className="menhir-image" />
    <p>Loading...</p>
  </div>
);

export default Loader;
