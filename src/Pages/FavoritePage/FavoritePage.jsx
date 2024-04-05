import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "./../../assets/favorite.png";

function FavoritePage() {
  const [fav, setFavorites] = useState(null);

  async function getAllFav() {
    try {
      let response = await axios.get(
        "https://project-management-first-try.adaptable.app/megalith?_embed=favorites"
      );
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllFav();
  }, []);

  if (!fav) {
    console.log("No Favorites to display");
    return null; // Return null if fav is not yet loaded
  }

  return (
    <div style={{ height: "80vh" }}>
      <h1 style={{ textAlign: "center", margin: "1rem" }}>
        All your Favorites
      </h1>
      {fav.map((favori, index) => (
        <div key={index}>
          {favori.favorites && favori.favorites.length ? (
            <div style={{ marginBottom: "1rem" }}>
              <img src={Logo} alt="" className="favori" />
              <p>{favori.name}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default FavoritePage;
