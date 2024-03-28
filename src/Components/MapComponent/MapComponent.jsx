import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent() {
  const [markers, setMarkers] = useState([]);

  const addMarker = (e) => {
    const { lat, lng } = e.latlng;
    setMarkers([...markers, { lat, lng }]);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "400px" }}
      onClick={addMarker}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>
            Marker {index + 1} <br /> Location: {marker.lat}, {marker.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
