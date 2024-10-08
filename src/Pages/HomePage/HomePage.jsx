import { useState, useEffect } from "react";
import photo from "../../assets/cercle.jpg";
import "./HomePage.css";
function HomePage() {
  const [loading, setLoading] = useState(() => {
    const firstLoad = sessionStorage.getItem("firstLoad");
    return !firstLoad ? true : false;
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("firstLoad", true);
    }, 3000);
  }, []);
  if (loading) {
    return "loading";
  }

  return (
    <div className="main-container">
      <div className="loading"></div>
      <div className="container-homepage">
        <img src={photo} />
        <div className="text-overlay">
          <style>
            @import url
            {
              "https://fonts.googleapis.com/css2?family=Englebert&family=MedievalSharp&display=swap"
            }
          </style>
          <div className="text-title">
            <h1> Welcome to Megalith</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
