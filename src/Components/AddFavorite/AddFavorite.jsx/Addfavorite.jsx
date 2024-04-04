import axios from "axios";

import "./../AddFavorite.css";
const AddFavoriteButton = ({ id, setSelectedMarker, selectedMarker }) => {
  const favorite = {
    megalithId: Number(id),
  };

  const handleAddFavorite = async () => {
    try {
      await axios.post(
        `https://project-management-first-try.adaptable.app/favorites/`,
        favorite
      );
      alert("Marker added to favorites!");
    } catch (error) {
      console.error("Error adding marker to favorites:", error);
    }
  };

  return (
    <button
      className="button-50"
      onClick={() => {
        handleAddFavorite();
        setSelectedMarker(id);
      }}
    >
      Add to Favorites
    </button>
  );
};

export default AddFavoriteButton;
