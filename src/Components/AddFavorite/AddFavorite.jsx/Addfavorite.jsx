import axios from "axios";
import PropTypes from "prop-types";
import "./../AddFavorite.css";
const AddFavoriteButton = ({ markerData }) => {
  const handleAddFavorite = async () => {
    try {
      await axios.post("https://your-json-server-url/favorites", markerData);
      alert("Marker added to favorites!");
    } catch (error) {
      console.error("Error adding marker to favorites:", error);
    }
  };

  return (
    <button className="button-50" onClick={handleAddFavorite}>
      Add to Favorites
    </button>
  );
};

AddFavoriteButton.propTypes = {
  markerData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    // Add more properties if needed
  }).isRequired,
};
export default AddFavoriteButton;
