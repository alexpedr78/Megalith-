import axios from "axios";
import "./../AddFavorite.css";

const AddFavoriteButton = ({ id, setSelectedMarker, selectedMarker }) => {
  const handleAddFavorite = async () => {
    console.log(id, selectedMarker);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/favorite/${id}`
      );
      console.log("Megalith added to favorites!");
    } catch (error) {
      console.error("Error adding marker to favorites:", error);
    }
  };

  return (
    <button className="button-52" onClick={handleAddFavorite}>
      Add to Favorites
    </button>
  );
};

export default AddFavoriteButton;
