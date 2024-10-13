import axios from "axios";

import "./../AddFavorite.css";
const AddFavoriteButton = ({ id, setSelectedMarker, selectedMarker }) => {
  const favorite = {
    megalithId: Number(id),
  };

  const handleAddFavorite = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}favorites/`,
        favorite
      );
      setSelectedMarker(id);
    } catch (error) {
      console.error("Error adding marker to favorites:", error);
    }
  };

  return (
    <button
      className="button-52"
      onClick={() => {
        handleAddFavorite();
      }}
    >
      Add to Favorites
    </button>
  );
};

export default AddFavoriteButton;
