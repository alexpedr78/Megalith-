import { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import photo from "../assets/cercle.jpg";
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
    return <Loader />;
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
            <h2> Welcome to Megalith,</h2>
          </div>
          <div className="text-para">
            <p>
              <strong>
                where exploration meets education! Immerse yourself in the
                legends surrounding these exceptional sites, where ancient
                mysteries and untold stories await discovery. From towering
                monuments to enigmatic structures, each site holds a tale as
                captivating as it is mysterious. Join us as we journey !!
                through the realms of myth and legend, unraveling the secrets of
                the past and igniting our curiosity for the unknown. Embark on
                an adventure of a lifetime and let the legends of Megalith guide
                your path to enlightenment.
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
