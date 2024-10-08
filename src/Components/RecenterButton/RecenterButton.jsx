import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";

function RecenterButton() {
  const map = useMap();
  const [userLocation, setUserLocation] = useState(null);

  // Function to handle clicking the recenter button
  const recenterMap = () => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13); // Set zoom level to 13 when recentering
    } else {
      console.error("User location not found");
    }
  };

  // Get the user's current location using Geolocation API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <button className="recenter-btn" onClick={recenterMap}>
      Recenter
    </button>
  );
}

export default RecenterButton;
