import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-cluster";
let url = "https://project-management-first-try.adaptable.app/megalith?";
import Addfavorite from "../AddFavorite/AddFavorite.jsx/Addfavorite";
import PropTypes from "prop-types";
import "./MapComponent.css";

function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const [type, setType] = useState("-1");
  const [region, setRegion] = useState("-1");
  const [addToggle, setAddToggle] = useState(false);
  async function displayMegalith() {
    let apiUrl = url;
    let params = [];
    if (region !== "-1") {
      params.push(`state=${region}`);
    }
    if (type !== "-1") {
      params.push(`type=${type}`);
    }
    if (type === "-2" && region === "-2") {
      params;
    }
    if (type === "-1" && region === "-1") {
      return;
    }

    console.log(type);
    console.log(`Region:${region}`);
    try {
      const response = await axios.get(apiUrl + params.join("&"));
      console.log(response);
      let megalithArray = response.data.map((elem) => ({
        name: elem.name,
        state: elem.state,
        village: elem.village,
        description: elem.description,
        position: { lat: elem.position.lat, long: elem.position.long },
      }));
      setMarkers(megalithArray);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    displayMegalith();
  }, [type, region]);

  const updatePopupContent = (index, content) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index].name = content;
    setMarkers(updatedMarkers);
    console.log(markers);
  };
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [typeForm, setTypeForm] = useState("");
  const [description, setDescription] = useState("");
  const [village, setVillage] = useState("");

  const addMegalith = async (event) => {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      let newMegalith = {
        id: crypto.randomUUID(),
        state: state,
        type: typeForm,
        name: name,
        village: village,
        description: description,
        position: {
          long: longitude,
          lat: latitude,
        },
      };

      try {
        const response = await axios.post(url, newMegalith);
        if (response) {
          setMarkers([...markers, newMegalith]);
          setName("");
          setState("");
          setTypeForm("");
          setVillage("");
          setDescription("");
          setAddToggle(false);
        } else {
          console.error("Failed to add megalith");
        }
      } catch (error) {
        console.error("Error adding megalith:", error);
      }
    });
  };
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div>
      <div className="mainMapPage">
        <Addfavorite markerData={selectedMarker} />
        <select
          className="button-50"
          onChange={(event) => setType(event.target.value)}
          name=""
          id=""
          value={type}
        >
          <option disabled value="-1">
            Select a Category
          </option>
          <option value="-2">All</option>
          <option value="Stone Circle">Stone Circle</option>
          <option value="Standing Stone (Menhir)">
            Standing Stone (Menhir)
          </option>
          <option value="Burial Chamber or Dolmen">
            Burial Chamber or Dolmen
          </option>
          <option value="Cave or Rock Shelter">Cave or Rock Shelter</option>
          <option value="Cairn">Cairn</option>
        </select>
        <select
          className="button-50"
          onChange={(event) => setRegion(event.target.value)}
          name=""
          id=""
          value={region}
        >
          <option disabled value="-1">
            Select Region
          </option>
          <option value="-2">All</option>
          <option value="Occitania">Occitania</option>
          <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
          <option value="Corsica">Corsica</option>
          <option value="Provence-Alpes-Côte d'Azur">
            Provence-Alpes-Côte d&apos;Azur
          </option>
          <option value="Ile-de-France">Ile-de-France</option>
          <option value="Normandy">Normandy</option>
          <option value="Navarre">Navarre</option>
          <option value="Brittany">Brittany</option>
          <option value="Hauts-de-France">Hauts-de-France</option>
          <option value="Grand Est">Grand Est</option>
          <option value="Centre-Val de Loire">Centre-Val de Loire</option>
          <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
          <option value="Pays de la Loire">Pays de la Loire</option>
          <option value="Bourgogne-Franche-Comté">
            Bourgogne-Franche-Comté
          </option>
        </select>
        <button className="button-50" onClick={() => setAddToggle(!addToggle)}>
          add
        </button>
        {addToggle ? (
          <form onSubmit={(event) => addMegalith(event)}>
            <label>Name</label>
            <input
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
            <label>Type</label>
            <input
              type="text"
              onChange={(event) => setTypeForm(event.target.value)}
            />
            <label>Village</label>
            <input
              type="text"
              onChange={(event) => setVillage(event.target.value)}
            />
            <label>Description</label>
            <label>Region</label>
            <input
              type="text"
              onChange={(event) => setState(event.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              onChange={(event) => setDescription(event.target.value)}
            />

            <button type="submit">submit</button>
          </form>
        ) : null}
      </div>
      <div
        style={{
          height: "400px",
          width: "400px",
          margin: "auto",
          top: "7rem",
          position: "sticky",
        }}
      >
        <MapContainer
          center={[46.52, 2.43]}
          zoom={5}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          />
          <MarkerClusterGroup>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={[marker.position.lat, marker.position.long]}
                eventHandlers={{ click: () => handleMarkerClick(marker) }}
              >
                <Popup>
                  <div>
                    <label>Name of the site:</label>
                    <input
                      type="text"
                      value={marker.name}
                      placeholder={marker.name}
                      onChange={(e) =>
                        updatePopupContent(
                          index,
                          e.target.value,
                          marker.description
                        )
                      }
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      value={marker.description}
                      onChange={(e) =>
                        updatePopupContent(index, marker.name, e.target.value)
                      }
                    />
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
MapComponent.propTypes = {
  markerData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    village: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
export default MapComponent;
