import axios from "axios";
import { useEffect } from "react";
import "./ListPage.css";
import { useState } from "react";
const url =
  "https://project-management-first-try.adaptable.app/megalith?_embed=favorites&_embed=comments";

import ListItem from "../../Components/ListItem/ListItem";

function ListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [megalith, setMegalith] = useState([]);
  const [site, setSite] = useState("");
  const [selectValue, setSelectValue] = useState("-1");
  const [selectValueRegion, setSelectValueRegion] = useState("-1");
  const [timeOutId, setTimeOutid] = useState(null);
  const [editId, setEditId] = useState(null); // Track which megalith is being edited
  const [updatedName, setUpdatedName] = useState("");
  const [updateDescription, setUpdatedDescription] = useState("");

  async function displayMegalith() {
    try {
      let searchParams = `/?_limit=25&_page=${currentPage}`;
      if (site) {
        searchParams += `&name_like=${site}`;
      }
      if (selectValue !== "-1") {
        searchParams += `&type=${selectValue}`;
      }
      if (selectValueRegion !== "-1") {
        searchParams += `&state=${selectValueRegion}`;
      }

      const response = await axios.get(url + searchParams);

      setMegalith(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id, updatedMegalith) {
    try {
      await axios.put(
        `https://project-management-first-try.adaptable.app/megalith/${id}`,
        updatedMegalith
      );

      setEditId(null); // Clear the edit state
      displayMegalith(); // Refresh the megalith list
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectChange(event) {
    const { value } = event.target;
    setSelectValue(value);
  }

  function handleSelectChangeRegion(event) {
    const { value } = event.target;

    setSelectValueRegion(value);
  }

  function handleEdit(id) {
    setEditId(id);
  }

  function handleCancelEdit() {
    setEditId(null); // Clear the edit state
  }

  async function handleDelete(id) {
    try {
      await axios.delete(
        `https://project-management-first-try.adaptable.app/megalith/${id}`
      );
      setMegalith((prevMegalith) =>
        prevMegalith.filter((site) => site.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    displayMegalith();
  }, [site, currentPage, selectValue, selectValueRegion]);

  function handleChangeSearchBar(event) {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    let id = setTimeout(() => {
      setSite(event.target.value);
    }, 500);

    setTimeOutid(id);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: for smooth scrolling behavior
    });
  }
  return (
    <div className="ListPage">
      <div className="buttonContainer">
        <div className="SelectListPage">
          <select
            className="button-50"
            onChange={handleSelectChange}
            name=""
            id=""
            value={selectValue}
          >
            <option disabled value="-1">
              Select by Category
            </option>
            <option value="-1">All</option>
            <option value="Stone Circle">Stone Circle</option>
            <option value="Standing Stone (Menhir)">
              Standing Stone (Menhir)
            </option>
            <option value="Burial Chamber or Dolmen">
              Burial Chamber or Dolmen
            </option>
            <option value="Cave or Rock Shelter">Cave or Rock Shelter</option>
            <option value="Cairn">Cairn</option>
          </select>
        </div>
        <div className="selectRegionListPage">
          <select
            className="button-50"
            onChange={handleSelectChangeRegion}
            name=""
            id=""
            value={selectValueRegion}
          >
            <option disabled value="-1">
              Select by Region
            </option>
            <option value="-1">All</option>
            <option value="Occitania">Occitania</option>
            <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
            <option value="Corsica">Corsica</option>
            <option value="Provence-Alpes-Côte d'Azur">
              Provence-Alpes-Côte d&apos;Azur
            </option>
            <option value="Ile-de-France">Ile-de-France</option>
            <option value="Normandy">Normandy</option>
            <option value="Navarre">Navarre</option>
            <option value="Brittany">Brittany</option>
            <option value="Hauts-de-France">Hauts-de-France</option>
            <option value="Grand Est">Grand Est</option>
            <option value="Centre-Val de Loire">Centre-Val de Loire</option>
            <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
            <option value="Pays de la Loire">Pays de la Loire</option>
            <option value="Bourgogne-Franche-Comté">
              Bourgogne-Franche-Comté
            </option>
          </select>
        </div>
        <div className="searchBarListPage">
          <input
            className="button-50"
            type="text"
            onChange={(event) => handleChangeSearchBar(event)}
            placeholder="Search by Name"
          />
        </div>
      </div>
      <div className="ListItemContainer">
        {megalith.map((site) => {
          return (
            <ListItem
              key={site.id}
              site={site}
              handleCancelEdit={handleCancelEdit}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              setUpdatedName={setUpdatedName}
              updatedName={updatedName}
              setUpdatedDescription={setUpdatedDescription}
              updateDescription={updateDescription}
              editId={editId}
              setEditId={setEditId}
              handleUpdate={handleUpdate}
            />
          );
        })}
      </div>
      <div className="buttonsListPage">
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <button
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next
        </button>

        <button className="scrollToTopButton" onClick={scrollToTop}>
          Scroll To Top
        </button>
      </div>
      <p>{currentPage}</p>
    </div>
  );
}

export default ListPage;
