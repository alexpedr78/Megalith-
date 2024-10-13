import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import "./MapComponent.css";
import AddFavoriteButton from "../AddFavorite/AddFavorite.jsx/Addfavorite";
import favorite from "./../../assets/favorite.png";
import Deletefavoris from "../DeleteFavoris/Deletefavoris";
import AddMegalithForm from "../AddMegalithWithMap/AddMegalith";
import SelectComponent from "../SelectComponent/SelectComponent";
import MegalithTypeOptions from "../SelectComponent/TypeOptions";
import RegionOptions from "../SelectComponent/RegionOptions";
import { Link } from "react-router-dom";
import RecenterButton from "../RecenterButton/RecenterButton";
let url = `${import.meta.env.VITE_BACKEND_URL}`;

// Custom Red Marker Icon
const redIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

function MapComponent() {
  const [detail, setDetails] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [type, setType] = useState("-1");
  const [region, setRegion] = useState("-1");
  const [addToggle, setAddToggle] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState(null); // Store clicked coordinates

  useEffect(() => {
    displayMegalith();
  }, [type, region, selectedMarker]);

  async function displayMegalith() {
    let apiUrl = url;
    let params = [];
    if (region !== "-1") {
      params.push(`state=${region}`);
    }
    if (type !== "-1") {
      params.push(`type=${type}`);
    }

    try {
      const response = await axios.get(
        apiUrl + (params.length ? "?" + params.join("&") : "")
      );
      if (response) {
        setAddToggle(false);
      }
      setMarkers(response.data.data); // Updated to access 'data' from response object
    } catch (error) {
      console.log(error);
    }
  }

  const addMegalith = async (newMegalith) => {
    try {
      const response = await axios.post(url, newMegalith);
      if (response) {
        setMarkers([...markers, response.data]);
        setAddToggle(false);
      } else {
        console.error("Failed to add");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePopupButtonClick = (id) => {
    if (detail === false) {
      setSelectedMarker(id);
      setDetails(!detail);
    }
  };

  // Custom component to handle map click events
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setClickedLatLng(e.latlng);
      },
    });
    return clickedLatLng ? (
      <Marker position={[clickedLatLng.lat, clickedLatLng.lng]} icon={redIcon}>
        <Popup>Selected Location for New Megalith</Popup>
      </Marker>
    ) : null;
  };

  return (
    <div className="mapComponent">
      <div className="mainMapPage">
        <div className="select-category-mp">
          {/* Category Filter Component */}
          <SelectComponent
            label="Select by Category"
            options={MegalithTypeOptions}
            name="type"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
        </div>
        <div className="select-region-mp">
          {/* Region Filter Component */}
          <SelectComponent
            label="Select by Region"
            options={RegionOptions}
            name="region"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
          />
        </div>

        {addToggle ? (
          <AddMegalithForm
            onSubmit={addMegalith}
            clickedLatLng={clickedLatLng}
            setClickedLatLng={setClickedLatLng}
          />
        ) : null}
        <div className="AddButton-mp">
          <button
            className="primary-button"
            onClick={() => setAddToggle(!addToggle)}
          >
            {!addToggle ? "Add your Megalith" : "Close and Cancel"}
          </button>
        </div>
      </div>
      <div className="mapMapComponent responsive-map">
        <MapContainer
          center={[46.52, 2.43]}
          zoom={5}
          style={{
            height: "100%",
            width: "100%",
            border: "2px solid #333",
            borderRadius: "10px",
          }}
        >
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          />
          <MapClickHandler />
          <MarkerClusterGroup>
            {markers.map((marker) => (
              <Marker
                key={marker._id}
                position={[marker.position.lat, marker.position.long]}
              >
                <Popup>
                  <div className="popup-container">
                    <p className="popUpname">{marker.name}</p>

                    {marker.favorites && marker.favorites.length ? (
                      <Link to="/favorites">
                        <img src={favorite} className="favori" alt="" />
                      </Link>
                    ) : null}
                    <div>
                      {!detail ? (
                        <button
                          className="secondary-button"
                          onClick={() => {
                            handlePopupButtonClick(marker._id);
                          }}
                        >
                          Megalith details!
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {marker.favorites && marker.favorites.length ? (
                        <Deletefavoris
                          selectedMarker={selectedMarker}
                          setSelectedMarker={setSelectedMarker}
                          id={marker.favorites[0].id}
                        />
                      ) : (
                        <AddFavoriteButton
                          selectedMarker={selectedMarker}
                          setSelectedMarker={setSelectedMarker}
                          id={marker._id}
                        />
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          <RecenterButton />
        </MapContainer>
      </div>
      {detail ? (
        <div className="details-container">
          <DetailsMegalith
            setDetails={setDetails}
            megalithId={selectedMarker}
            detail={detail}
          />
        </div>
      ) : null}
    </div>
  );
}

export default MapComponent;
