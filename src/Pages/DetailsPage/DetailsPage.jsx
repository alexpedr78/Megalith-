import "./DetailsPage.css";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OneMegaMap from "../../Components/OneMegaMap/OneMegaMap";
function DetailsPage() {
  const { id } = useParams();
  const [oneMega, setOneMega] = useState(null);

  useEffect(() => {
    async function getOneMegalith(id) {
      try {
        const response = await axios.get(
          `https://project-management-first-try.adaptable.app/megalith/${id}`
        );
        setOneMega(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getOneMegalith(id);
  }, []);

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
      </div>
      <OneMegaMap id={id} oneMega={oneMega} />
    </div>
  );
}

export default DetailsPage;
