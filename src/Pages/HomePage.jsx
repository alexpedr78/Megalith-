//import Earth from "../Components/MapComponent/Earth";
import { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
function HomePage() {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  if (Loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="loading"></div>
      <div className="container">
        {" "}
        <p>container, change it later</p>
      </div>
    </div>
  );
}

export default HomePage;
