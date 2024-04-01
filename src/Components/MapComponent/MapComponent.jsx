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
const url = "https://project-management-first-try.adaptable.app";

function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const [type, setType] = useState("Stone Circle");
  async function displayMegalith() {
    try {
      const response = await axios.get(`${url}/megalith?type=${type}`);
      console.log(response);
      let megalithArray = response.data.map((elem) => ({
        name: elem.name,
        // state: elem.state,
        // village : elem.village,
        description: elem.description,
        position: { lat: elem.position.lat, long: elem.position.long },
      }));
      setMarkers(megalithArray);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    displayMegalith(); // Call the function immediately

    // Clean-up function not needed here since there are no subscriptions or timers
  }, []);

  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newMarker = { lat, lng, popupContent: "" }; // Initialize popup content
        setMarkers([...markers, newMarker]);
      },
    });

    return null;
  };

  const updatePopupContent = (index, content) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index].name = content;
    setMarkers(updatedMarkers);
    console.log(markers);
  };

  return (
    <div style={{ height: "400px", width: "400px" }}>
      <MapContainer
        center={[48, 0.6]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <AddMarkerOnClick />
        <TileLayer
          url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=1be55fa830ae4fc782b198c32056911f

          "
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.position.lat, marker.position.long]}
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
      </MapContainer>
    </div>
  );
}

export default MapComponent;
