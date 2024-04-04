import React from "react";
import axios from "axios"; // Don't forget to import axios

function Deletefavoris({ id, setSelectedMarker, selectedMarker }) {
  console.log(id);
  async function handleDeletefav() {
    try {
      const response = await axios.delete(
        `https://project-management-first-try.adaptable.app/favorites/?megalithId_like=${id}`
      );
      console.log("Favorite deleted successfully!");
    } catch (error) {
      console.log("Error deleting favorite:", error);
    }
  }

  return (
    <button
      onClick={() => {
        setSelectedMarker(id);
        console.log(selectedMarker);
        handleDeletefav();
      }}
    >
      Delete favoris
    </button>
  ); // Call handleDeletefav when the button is clicked
}

export default Deletefavoris;
