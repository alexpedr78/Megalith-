import "./DetailsMegalith.css";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import favorite from "./../assets/favorite.png";
import axios from "axios";
import OneMegaMap from "./OneMegaMap/OneMegaMap";
import AddCommentsButton from "./AddCommentsButton/AddCommentsButton";

function DetailsMegalith({ setDetails, detail, megalithId }) {
  const [oneMega, setOneMega] = useState(null);

  useEffect(() => {
    async function getOneMegalith(id) {
      try {
        const response = await axios.get(
          `https://project-management-first-try.adaptable.app/megalith/${id}/?_embed=favorites`
        );
        setOneMega(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getOneMegalith(megalithId);
  }, [megalithId]);

  if (!oneMega) {
    return <p>loading</p>;
  }

  return (
    <div className="detailPageDivContainer">
      <div className="descriptionPtagsDetailsPage">
        <p>Name of the site: {oneMega.name}</p>
        <p>Type of the site: {oneMega.type}</p>
        <p>City : {oneMega.village}</p>
        <p>Region: {oneMega.state}</p>
        <p>Latitude:{oneMega.position.lat}</p>
        <p>Longitude: {oneMega.position.long}</p>
      </div>
      {oneMega.favorites.length > 0 ? (
        <img src={favorite} className="favori" alt="" />
      ) : null}
      <AddCommentsButton id={oneMega.id} />
      <div>
        <OneMegaMap id={megalithId} oneMega={oneMega} />

        <button onClick={() => setDetails(!detail)} className="button-50">
          Close details window
        </button>
      </div>
    </div>
  );
}

export default DetailsMegalith;
