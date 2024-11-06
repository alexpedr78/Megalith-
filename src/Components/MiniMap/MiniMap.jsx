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

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={miniMapContainerStyle}
      center={position}
      zoom={12}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      options={{
        disableDefaultUI: true,
        gestureHandling: "none",
      }}
    />
  );
}

export default MiniMap;
