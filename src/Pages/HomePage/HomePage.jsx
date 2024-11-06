import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import LoadingSpinner from "../../Components/Loader/Loader.jsx";
import "./HomePage.css";

function HomePage() {
  const [loading, setLoading] = useState(() => {
    const firstLoad = sessionStorage.getItem("firstLoad");
    return !firstLoad ? true : false;
  });

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("firstLoad", true);
    }, 3000);
  }, []);

  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="main-container">
      <div className="background-image">
        <div className="overlay">
          <div className="text-overlay">
            <div className="text-title">
              <h1>Welcome to Megalith</h1>
              <p>Explore the historic megaliths of France</p>
              <div className="div-button-homepage">
                {/* Navigate to "/appPage" when clicked */}
                <button
                  onClick={() => navigate("/Map")}
                  className="explore-button"
                >
                  Explore Now
                </button>
                <button
                  onClick={() => navigate("/infos")}
                  className="explore-button"
                >
                  Get more infos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
