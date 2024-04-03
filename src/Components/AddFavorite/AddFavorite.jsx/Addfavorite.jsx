import axios from "axios";

import "./../AddFavorite.css";
const AddFavoriteButton = ({ id }) => {
  console.log(id);
  const favorite = {
    id: 1,
    megalithId: id,
  };
  console.log(id);
  const handleAddFavorite = async () => {
    try {
      await axios.get(
        `https://project-management-first-try.adaptable.app/favorites/`,
        favorite
      );
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

export default AddFavoriteButton;
