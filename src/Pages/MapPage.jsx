import MapComponent from "../Components/MapComponent/MapComponent";
import "./MapPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-markercluster";

function MapPage() {
  return (
    <MapContainer>
      <MapComponent />
    </MapContainer>
  );
}

export default MapPage;
