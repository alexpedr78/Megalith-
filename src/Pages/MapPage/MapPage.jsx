import MapComponent from "../../Components/MapComponent/MapComponent";
import "./MapPage.css";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import Addfavorite from "../../Components/AddFavorite/AddFavorite.jsx/Addfavorite";
function MapPage() {
  return (
    <div>
      <MapComponent />
    </div>
  );
}

export default MapPage;
