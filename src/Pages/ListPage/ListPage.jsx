import React, { useEffect, useState } from "react";
import axios from "axios";
import SelectComponent from "../../Components/SelectComponent/SelectComponent";
import RegionOptions from "../../Components/SelectComponent/RegionOptions";
import TypeOptions from "../../Components/SelectComponent/TypeOptions";
import ListItem from "../../Components/ListItem/ListItem.jsx";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import "./ListPage.css";
import LoadingSpinner from "../../Components/Loader/Loader.jsx";

const ListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [megalith, setMegalith] = useState([]);
  const [site, setSite] = useState("");
  const [selectValue, setSelectValue] = useState("-1");
  const [selectValueRegion, setSelectValueRegion] = useState("-1");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMegaliths = async () => {
    setLoading(true);
    try {
      let params = `?_limit=25&_page=${currentPage}`;
      if (site) params += `&name=${encodeURIComponent(site)}`;
      if (selectValue !== "-1")
        params += `&type=${encodeURIComponent(selectValue)}`;
      if (selectValueRegion !== "-1")
        params += `&state=${encodeURIComponent(selectValueRegion)}`;

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/megalith${params}`
      );
      setMegalith(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchMegaliths();
    }, 500);

    return () => clearTimeout(delayFetch);
  }, [site, currentPage, selectValue, selectValueRegion]);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/megalith/${id}`
      );
      setMegalith((prevMegalith) =>
        prevMegalith.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSite(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="ListPage">
      <div className="filterContainer">
        <SearchBar
          value={site}
          onChange={handleSearchChange}
          onSubmit={handleSearchSubmit}
        />
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="ListItemContainer">
          {megalith.map((item) => (
            <ListItem
              key={item._id}
              site={item}
              editId={editId}
              setEditId={setEditId}
              setMegalith={setMegalith}
              megalith={megalith}
              handleDelete={() => handleDelete(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListPage;
