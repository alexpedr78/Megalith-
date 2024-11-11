import React, { useRef, useEffect, useMemo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const LIBRARIES = ["places", "marker"];

const miniMapContainerStyle = {
  height: "200px",
  width: "100%",
  borderRadius: "10px",
};

function MiniMap({ lat, lng }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const position = useMemo(
    () => ({ lat: parseFloat(lat), lng: parseFloat(lng) }),
    [lat, lng]
  );

  useEffect(() => {
    if (isLoaded && mapRef.current && !markerRef.current) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position,
        title: "Selected Location",
      });
    } else if (markerRef.current) {
      markerRef.current.position = position;
    }
  }, [isLoaded, position]);

  const handleLocationButton = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          mapRef.current.panTo(userPosition);
          mapRef.current.setZoom(14);

          // Optionally, add a marker for user's location
          new google.maps.Marker({
            position: userPosition,
            map: mapRef.current,
            title: "You are here",
          });
        },
        () => alert("Could not get your location")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={miniMapContainerStyle}
      center={position}
      zoom={12}
      onLoad={(map) => {
        mapRef.current = map;

        // Adding a custom My Location button to the map
        const locationButtonDiv = document.createElement("div");
        locationButtonDiv.className = "custom-location-button";
        locationButtonDiv.textContent = "My Location";
        locationButtonDiv.style.padding = "10px";
        locationButtonDiv.style.margin = "10px";
        locationButtonDiv.style.backgroundColor = "#fff";
        locationButtonDiv.style.cursor = "pointer";
        locationButtonDiv.style.borderRadius = "5px";
        locationButtonDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";

        locationButtonDiv.addEventListener("click", handleLocationButton);
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
          locationButtonDiv
        );
      }}
      options={{
        disableDefaultUI: false,
        gestureHandling: "auto",
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: true,
        fullscreenControl: false,
        clickableIcons: true,
      }}
    />
  );
}

export default MiniMap;
