import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./ListPage.css";
function ListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(50);
  const [megalith, setMegalith] = useState([]);
  const [site, setSite] = useState("");
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  //   const [selectValue, setSelectValue] = useState(-1);

  async function displayMegalith() {
    try {
      const response = await axios.get(
        "https://project-management-first-try.adaptable.app/megalith"
      );
      setMegalith(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  //   .filter((elem) => elem.type === "Stone Circle")
  const currentPageMegaliths = megalith.slice(startIndex, endIndex);

  useEffect(() => {
    displayMegalith();
  }, []);

  //   const selectedType = megalith.filter((elem) => elem.type === selectValue);
  const searchItem = currentPageMegaliths.filter((elem) =>
    elem.name.toLowerCase().includes(site.toLowerCase())
  );

  return (
    <div>
      <p>ListPage</p>
      {/* <select
        onChange={(event) => {
          setSelectValue(event.target.value);
        }}
        value={selectValue}
        name=""
        id=""
      >
        <option disabled value="-1">
          select
        </option>
        <option value="Stone Circle">Stone Circle</option>
        <option value=""></option>
        <option value=""></option>
      </select> */}

      <input
        type="text"
        onChange={(event) => {
          setSite(event.target.value);
        }}
        value={site}
        placeholder="Search by name"
      />

      {searchItem.map((site) => {
        return (
          <article className="megalithItem" key={site.id}>
            <p>{site.name}</p>
            <p>{site.type}</p>
            <p>{site.position.long}</p>
            <p>{site.position.lat}</p>
          </article>
        );
      })}
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  );
}

export default ListPage;
