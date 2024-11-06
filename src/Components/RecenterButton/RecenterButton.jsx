import React from "react";

const RecenterButton = ({ map }) => {
  const handleRecenter = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.panTo({ lat: latitude, lng: longitude });
          map.setZoom(10);
        },
        () => {
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert(
        "Geolocation is not supported by this browser or map is not loaded."
      );
    }
  };

  return (
    <button onClick={handleRecenter} className="recenter-button">
      Recenter to My Location
    </button>
  );
};

export default RecenterButton;
