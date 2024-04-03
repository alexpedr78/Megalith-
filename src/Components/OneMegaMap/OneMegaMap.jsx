import "./OneMegaMap.css";
import { MapContainer } from "react-leaflet";
import { Popup, Marker, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
function OneMegaMap({ oneMega }) {
  return (
    <MapContainer
      center={[46.52, 2.43]}
      zoom={5}
      style={{
        height: "400px",
        width: "400px",
      }}
    >
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
    </MapContainer>
  );
}

OneMegaMap.propTypes = {
  oneMega: PropTypes.shape({
    id: PropTypes.number.isRequired,
    state: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    village: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.shape({
      long: PropTypes.number,
      lat: PropTypes.number,
    }),
  }).isRequired,
};

export default OneMegaMap;
