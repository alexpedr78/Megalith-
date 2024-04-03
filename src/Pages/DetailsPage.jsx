import "./DetailsPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "../Components/MapComponent/MapComponent";
function DetailsPage() {
  const { id } = useParams();
  const [oneMega, setOneMega] = useState(null);

  useEffect(() => {
    async function getOneMegalith(id) {
      try {
        const response = await axios.get(
          `https://project-management-first-try.adaptable.app/megalith/${id}`
        );
        setOneMega(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getOneMegalith(id);
  }, []);

  if (!oneMega) {
    return <p>loading</p>;
  }
  console.log(oneMega);
  return (
    <div className="detailPageDivContainer">
      <div className="descriptionPtagsDetailsPage">
        <p>Name: {oneMega.name}</p>
        <p>Type: {oneMega.type}</p>
        <p>State: {oneMega.state}</p>
        <p>
          Position: lat:{oneMega.position.lat}
          long: {oneMega.position.long}
        </p>
      </div>
      <MapComponent />
      {/* <MapContainer
        center={[46.52, 2.43]}
        zoom={5}
        style={{
          height: "400px",
          width: "400px",
        }}
      > */}
      {/* <AddMarkerOnClick />
        <TileLayer
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        />
        {oneMega.position && (
          <Marker
            position={[oneMega.position.lat || 0, oneMega.position.long || 0]}
          >
            <Popup>
              <h1>test</h1>
            </Popup>
          </Marker>
        )}
      </MapContainer> */}
    </div>
  );
}

export default DetailsPage;
