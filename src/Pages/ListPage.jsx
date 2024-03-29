import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "./ListPage.css";
const url = "https://project-management-first-try.adaptable.app";
function ListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [megalith, setMegalith] = useState([]);
  //   const [originalMegalith, setOriginalMegalith] = useState("");
  const [site, setSite] = useState("");
  const [selectValue, setSelectValue] = useState("-1");
  const [timeOutId, setTimeOutid] = useState(null);
  // `/&type=${selectValue}&`
  async function displayMegalith() {
    try {
      let searchParams = `/megalith?_limit=50&_page=${currentPage}`;
      if (site) {
        searchParams += `&name_like=${site}`;
      }
      if (selectValue !== "-1") {
        searchParams += `&type=${selectValue}`;
      }
      const response = await axios.get(url + searchParams);
      console.log(response.data);
      setMegalith(response.data);
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
    // const selectedType = megalith.filter((elem) => elem.type === selectValue);
    setTimeOutid(id);
  }
  function handleSelectChange(event) {
    const { value } = event.target;
    setSelectValue(value);
  }

  //   const searchItem = megalith.filter((elem) => {
  //     if (selectValue === "-1") {
  //       return elem.name.toLowerCase().includes(site.toLowerCase());
  //     } else {
  //       return (
  //         elem.name.toLowerCase().includes(site.toLowerCase()) ||
  //         megalith.filter((elem) => elem.type === selectValue)
  //       );
  //     }
  //   });
  //   const filteredMegalith = megalith.filter((elem) =>
  //     elem.name.toLowerCase().includes(site.toLowerCase())
  //   );
  //   async function searchBar() {
  //     try {
  //       const response = await axios.get(
  //         `https://project-management-first-try.adaptable.app/megalith?name_like=${site}`
  //       );
  //       //   &_limit=50&_page=${currentPage}
  //       console.log(response.data);
  //       if (site === "") {
  //         setCurrentPage(1);
  //         setMegalith(originalMegalith);
  //       } else {
  //         setMegalith(response.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // (event) => {
  //     setSelectValue(event.target.value);
  //   searchBar();
  return (
    <div>
      <p>ListPage</p>
      <select onChange={handleSelectChange} name="" id="" value={selectValue}>
        <option disabled value="-1">
          select
        </option>
        <option value="-1">All</option>
        <option value="Stone Circle">Stone Circle</option>
        <option value="Stone Circle">Stone Circle</option>
        <option value="Stone Circle">Stone Circle</option>
        <option value="Stone Circle">Stone Circle</option>
      </select>

      <input
        type="text"
        onChange={(event) => handleChange(event)}
        placeholder="Search by name"
      />

      {megalith.map((site) => {
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
        className="buttonListPage"
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="buttonListPage"
        onClick={() => {
          setCurrentPage((prev) => prev + 1);
        }}
      >
        Next
      </button>
    </div>
  );
}

export default ListPage;
