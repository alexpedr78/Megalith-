import axios from "axios";
import { useEffect } from "react";
import "./ListPage.css";
import { useState } from "react";

const url = "https://project-management-first-try.adaptable.app";

function ListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [megalith, setMegalith] = useState([]);
  const [site, setSite] = useState("");
  const [selectValue, setSelectValue] = useState("-1");
  const [timeOutId, setTimeOutid] = useState(null);
  const [editId, setEditId] = useState(null); // Track which megalith is being edited
  const [updatedName, setUpdatedName] = useState("");
  const [updateDescription, setUpdatedDescription] = useState("");

  async function displayMegalith() {
    try {
      let searchParams = `/megalith?_limit=25&_page=${currentPage}`;
      if (site) {
        searchParams += `&name_like=${site}`;
      }
      if (selectValue !== "-1") {
        searchParams += `&type=${selectValue}`;
      }
      // if(selectDepartements !== -1){
      //   searchParams
      // }
      const response = await axios.get(url + searchParams);
      setMegalith(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate(id, updatedData) {
    try {
      await axios.put(`${url}/megalith/${id}`, updatedData);
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

  function handleEdit(id) {
    setEditId(id);
  }

  function handleCancelEdit() {
    setEditId(null); // Clear the edit state
  }
  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/megalith/${id}`);
      setMegalith((prevMegalith) =>
        prevMegalith.filter((site) => site.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    displayMegalith();
  }, [site, currentPage, selectValue]);

  function handleChange(event) {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    let id = setTimeout(() => {
      setSite(event.target.value);
    }, 500);

    setTimeOutid(id);
  }

  return (
    <div className="ListPage">
      <div className="buttonContainer">
        {" "}
        <div className="SelectListPage">
          <select
            className="button-50"
            onChange={handleSelectChange}
            name=""
            id=""
            value={selectValue}
          >
            <option disabled value="-1">
              select
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
        <div className="searchBarListPage">
          <input
            className="button-50"
            type="text"
            onChange={(event) => handleChange(event)}
            placeholder="Search by name"
          />
        </div>
      </div>
      <div className="ContainerInputListPage"></div>
      <div className="ListItemContainer">
        {megalith.map((site) => {
          return (
            <article className="megalithItem" key={site.id}>
              <p>{site.name ? `Name of the site : ${site.name}` : null}</p>
              <p>{site.type ? `Category of the site : ${site.type}` : null}</p>
              <p>{site.state ? `Department : ${site.state}` : null}</p>
              <p>{site.village ? `Village : ${site.village}` : null}</p>
              <p>
                {site.description ? `description : ${site.description}` : null}
              </p>
              <p>
                {site.position
                  ? `Position of the site : (${
                      site.position.lat ? site.position.lat : "N/A"
                    }, ${site.position.long ? site.position.long : "N/A"})`
                  : null}
              </p>

              <button
                className="button-55"
                onClick={() => handleDelete(site.id)}
              >
                delete
              </button>

              {/* ///////////////////////////////////////////////////// */}
              {editId === site.id ? ( // Conditionally render form for editing
                <div>
                  <input
                    className="button-55"
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    placeholder={site.name}
                  />
                  <input
                    className="button-55"
                    type="text"
                    value={updateDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                    placeholder={site.description ? `${site.description}` : ""}
                  />
                  <button
                    className=".button-55"
                    onClick={() => handleUpdate(site.id)}
                  >
                    Save
                  </button>
                  <button className=".button-55" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className=".button-55"
                    onClick={() => handleEdit(site.id, site.name)}
                  >
                    Update
                  </button>
                </div>
              )}
              {/* /////////////////// */}
            </article>
          );
        })}
      </div>
      {/* ///////////////////////////// */}
      <div className="buttonListPage">
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
      </div>
      <p>{currentPage}</p>
      {/* /////////////////// */}
    </div>
  );
}

export default ListPage;
