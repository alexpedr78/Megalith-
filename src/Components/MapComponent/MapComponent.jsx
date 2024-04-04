import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import MarkerClusterGroup from "react-leaflet-cluster";
let url =
  "https://project-management-first-try.adaptable.app/megalith?_embed=favorites&";

import "./MapComponent.css";
import DetailsMegalith from "../DetailsMegalith";
import AddFavoriteButton from "../AddFavorite/AddFavorite.jsx/Addfavorite";
import favorite from "./../../assets/favorite.png";
import Deletefavoris from "../DeleteFavoris/Deletefavoris";
function MapComponent() {
  const [detail, setDetails] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [type, setType] = useState("-1");
  const [region, setRegion] = useState("-1");
  const [addToggle, setAddToggle] = useState(false);

  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [typeForm, setTypeForm] = useState("");
  const [description, setDescription] = useState("");
  const [village, setVillage] = useState("");

  const [selectedMarker, setSelectedMarker] = useState(1);

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

    try {
      const response = await axios.get(apiUrl + params.join("&"));

      setMarkers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    displayMegalith();
  }, [type, region, selectedMarker]);

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

  const handleMarkerClick = (markerId) => {
    if (!isNaN(markerId)) {
      setSelectedMarker(markerId);
    }
  };
  const handlePopupButtonClick = (id) => {
    setSelectedMarker(id);
    setDetails(!detail);
  };
  console.log(selectedMarker);
  return (
    <div className="mapComponent">
      {detail ? (
        <div>
          <DetailsMegalith megalithId={parseInt(selectedMarker)} />
        </div>
      ) : null}
      <div className="mainMapPage">
        <div className="select-category-mp">
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
        </div>
        <div className="select-region-mp">
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
        </div>
        <div className="AddButton-mp">
          <button
            className="button-50"
            onClick={() => setAddToggle(!addToggle)}
          >
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
      </div>
      <div
        className="mapMapComponent"
        style={{
          height: "400px",
          width: "400px",
          margin: "auto",
        }}
      >
        <MapContainer
          center={[46.52, 2.43]}
          zoom={5}
          style={{
            height: "100%",
            width: "100%",
            border: "2px solid",
            borderRadius: "5px",
          }}
        >
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          />
          <MarkerClusterGroup>
            {markers.map((marker, index) => (
              <Marker
                id={marker.id}
                key={index + 1}
                value={marker.id}
                position={[marker.position.lat, marker.position.long]}
              >
                <Popup>
                  <div>
                    {marker.name}
                    {marker.favorites.length ? (
                      <img src={favorite} alt="" />
                    ) : null}
                    <button
                      onClick={() => {
                        handlePopupButtonClick(marker.id);
                      }}
                    >
                      GO !
                    </button>

                    {marker.favorites.length ? (
                      <Deletefavoris
                        selectedMarker={selectedMarker}
                        setSelectedMarker={setSelectedMarker}
                        id={marker.favorites[0].id}
                      />
                    ) : (
                      <AddFavoriteButton
                        selectedMarker={selectedMarker}
                        setSelectedMarker={setSelectedMarker}
                        id={marker.id}
                      />
                    )}
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

// MapComponent.propTypes = {
//   markerData: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     state: PropTypes.string.isRequired,
//     type: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     village: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     position: PropTypes.shape({
//       lat: PropTypes.number.isRequired,
//       long: PropTypes.number.isRequired,
//     }).isRequired,
//   }).isRequired,
// };
export default MapComponent;
