import "./DetailsMegalith.css";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import favorite from "./../assets/favorite.png";
import axios from "axios";
import OneMegaMap from "./OneMegaMap/OneMegaMap";
import AddCommentsButton from "./AddCommentsButton/AddCommentsButton";

function DetailsMegalith({ megalithId }) {
  const [oneMega, setOneMega] = useState(null);
  console.log(megalithId);

  useEffect(() => {
    async function getOneMegalith(id) {
      try {
        console.log(id);
        const response = await axios.get(
          `https://project-management-first-try.adaptable.app/megalith/${id}/?_embed=favorites`
        );
        console.log(response.data);
        setOneMega(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getOneMegalith(megalithId);
  }, [megalithId]);

  if (!oneMega) {
    return <p>loading</p>;
  }
  console.log(oneMega);
  return (
    <div className="detailPageDivContainer">
      <div className="descriptionPtagsDetailsPage">
        <p>Name: {oneMega.name}</p>
        <p>Type: {oneMega.type}</p>
        <p>State: {oneMega.state}</p>
        <p>
          Position: lat:{oneMega.position.lat}
          long: {oneMega.position.long}
        </p>
        {oneMega.favorites.length > 0 ? <img src={favorite} alt="" /> : null}
      </div>
      <OneMegaMap id={megalithId} oneMega={oneMega} />
      <AddCommentsButton id={oneMega.id} />
    </div>
  );
}

export default DetailsMegalith;
