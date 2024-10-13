import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectComponent from "../../Components/SelectComponent/SelectComponent";
import RegionOptions from "../../Components/SelectComponent/RegionOptions";
import TypeOptions from "../../Components/SelectComponent/TypeOptions";
import ListItem from "../../Components/ListItem/ListItem.jsx";
import "./ListPage.css";

const ListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [megalith, setMegalith] = useState([]);
  const [site, setSite] = useState(""); // Search term for name
  const [selectValue, setSelectValue] = useState("-1");
  const [selectValueRegion, setSelectValueRegion] = useState("-1");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchMegaliths = async () => {
      try {
        let params = `?_limit=25&_page=${currentPage}`;
        if (site) {
          params += `&name=${encodeURIComponent(site)}`;
        }
        if (selectValue !== "-1") {
          params += `&type=${encodeURIComponent(selectValue)}`;
        }
        if (selectValueRegion !== "-1") {
          params += `&state=${encodeURIComponent(selectValueRegion)}`;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/megalith${params}`
        );
        setMegalith(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Debounce: delay the request by 1 second
    const delayFetch = setTimeout(() => {
      fetchMegaliths();
    }, 1000); // 1 second delay

    // Cleanup timeout if the component re-renders before the 1 second delay is up
    return () => clearTimeout(delayFetch);
  }, [site, currentPage, selectValue, selectValueRegion]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/megalith/${id}`);
      setMegalith(megalith.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSite(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Optionally reset the page to 1 when searching
  };

  return (
    <div className="ListPage">
      <div className="filterContainer">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search by name"
            value={site}
            onChange={handleSearchChange}
            className="searchInput"
          />
          <button type="submit" className="searchButton">
            Search
          </button>
        </form>
        <SelectComponent
          label="Select by Category"
          options={TypeOptions}
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        />
        <SelectComponent
          label="Select by Region"
          options={RegionOptions}
          value={selectValueRegion}
          onChange={(e) => setSelectValueRegion(e.target.value)}
        />
      </div>
      <div className="ListItemContainer">
        {megalith.map((item) => (
          <ListItem
            key={item.id || item._id}
            site={item}
            editId={editId}
            setEditId={setEditId}
            setMegalith={setMegalith}
            megalith={megalith}
            handleDelete={() => handleDelete(item.id || item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
