import React from "react";
import axios from "axios"; // Don't forget to import axios

function Deletefavoris({ id, setSelectedMarker, selectedMarker }) {
  async function handleDeletefav() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/favorites/${id}`
      );
      setSelectedMarker(null);
      console.log("Favorite deleted successfully!");
    } catch (error) {
      console.log("Error deleting favorite:", error);
    }
  }

  return (
    <button
      className="button-52"
      onClick={() => {
        handleDeletefav();
        console.log(selectedMarker);
        setSelectedMarker(id);
      }}
    >
      Delete favoris
    </button>
  );
}

export default Deletefavoris;
