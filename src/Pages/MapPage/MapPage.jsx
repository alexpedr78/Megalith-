import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./MapPage.css";
import SelectComponent from "../../Components/SelectComponent/SelectComponent.jsx";
import MegalithTypeOptions from "../../Components/SelectComponent/TypeOptions.jsx";
import RegionOptions from "../../Components/SelectComponent/RegionOptions.jsx";
import AddMegalithForm from "../../Components/AddMegalith/addMegalithForm.jsx";
import AddFavoriteButton from "../../Components/AddFavorite/AddFavorite.jsx/Addfavorite.jsx";
import CommentForm from "../../Components/AddCommentsButton/AddCommentsButton.jsx";

const mapContainerStyle = {
  height: "60vh",
  width: "100%",
  maxWidth: "1200px",
  margin: "auto",
  borderRadius: "10px",
};

const center = { lat: 46.52, lng: 2.43 };

function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [map, setMap] = useState(null);
  const [type, setType] = useState("-1");
  const [region, setRegion] = useState("-1");
  const [addToggle, setAddToggle] = useState(false);
  const [addComment, setAddComment] = useState(false);

  useEffect(() => {
    fetchMarkers();
  }, [type, region]);

  async function fetchMarkers() {
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/megalith/map`;
    let params = [];
    if (type !== "-1") params.push(`type=${type}`);
    if (region !== "-1") params.push(`state=${region}`);

    try {
      const response = await axios.get(
        apiUrl + (params.length ? "?" + params.join("&") : "")
      );
      setMarkers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleFindLocation = useCallback(() => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.panTo({ lat: latitude, lng: longitude });
          map.setZoom(10);
        },
        () => alert("Unable to retrieve location")
      );
    } else {
      alert(
        "Geolocation is not supported by this browser or the map is not loaded yet."
      );
    }
  }, [map]);

  const addLocationButton = useCallback(() => {
    if (map) {
      const locationButton = document.createElement("div");
      locationButton.className = "custom-location-button";
      locationButton.textContent = "My Location";
      locationButton.style.backgroundColor = "#fff";
      locationButton.style.border = "2px solid #fff";
      locationButton.style.borderRadius = "3px";
      locationButton.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      locationButton.style.cursor = "pointer";
      locationButton.style.margin = "10px";
      locationButton.style.padding = "6px";
      locationButton.style.textAlign = "center";

      locationButton.addEventListener("click", handleFindLocation);
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(
        locationButton
      );
    }
  }, [map, handleFindLocation]);

  useEffect(() => {
    if (map) addLocationButton();
  }, [map, addLocationButton]);

  const navigate = useNavigate();

  return (
    <div className="mapComponent">
      <div className="filterContainer">
        <SelectComponent
          setAddToggle={setAddToggle}
          addToggle={addToggle}
          label="Select by Category"
          options={MegalithTypeOptions}
          name="type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        />
        <SelectComponent
          setAddToggle={setAddToggle}
          addToggle={addToggle}
          label="Select by Region"
          options={RegionOptions}
          name="region"
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        />
      </div>

      {addToggle && <AddMegalithForm />}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={6}
        mapId="aa2100b1b85e24af"
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {markers.map((marker) => (
          <Marker
            key={marker._id}
            position={{
              lat: marker.position.lat,
              lng: marker.position.long,
            }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.position.lat,
              lng: selectedMarker.position.long,
            }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="infoWindow-container">
              <h3 className="infoWindow-title">{selectedMarker.name}</h3>
              {selectedMarker.favorites?.length > 0 && (
                <Link to="/favorites">
                  <img
                    src="./favorite.png"
                    className="infoWindow-favorite"
                    alt="Favorite"
                  />
                </Link>
              )}
              <AddFavoriteButton
                selectedMarker={selectedMarker}
                setSelectedMarker={setSelectedMarker}
                id={selectedMarker._id}
              />
              <button
                className="infoWindow-button"
                onClick={() => setAddComment(!addComment)}
              >
                {addComment ? "Cancel" : "Add Comment"}
              </button>
              {addComment && (
                <CommentForm
                  megalithId={selectedMarker._id}
                  onCommentAdded={(newComment) => handleAddComment(newComment)}
                />
              )}
              <button
                className="infoWindow-button"
                onClick={() =>
                  navigate("/detail/" + selectedMarker._id, {
                    state: { site: selectedMarker },
                  })
                }
              >
                Megalith Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
      <div className="AddButton-mp">
        <button
          className="find-location-button"
          onClick={() => setAddToggle(!addToggle)}
        >
          {!addToggle ? "Add your Megalith" : "Close and Cancel"}
        </button>
        <button className="recenter-button" onClick={handleFindLocation}>
          My Location
        </button>
      </div>
    </div>
  );
}

export default MapComponent;
