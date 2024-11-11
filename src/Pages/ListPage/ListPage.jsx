import React, { useEffect, useState, useCallback } from "react";
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
  // const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTopButton, setShowTopButton] = useState(false);

  const fetchMegaliths = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let params = `?_limit=25&_page=${currentPage}`;
      if (site) params += `&name=${encodeURIComponent(site)}`;
      if (selectValue !== "-1")
        params += `&type=${encodeURIComponent(selectValue)}`;
      if (selectValueRegion !== "-1")
        params += `&state=${encodeURIComponent(selectValueRegion)}`;

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/megalith${params}`
      );
      setMegalith(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, site, selectValue, selectValueRegion]);

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchMegaliths();
    }, 500);

    return () => clearTimeout(delayFetch);
  }, [fetchMegaliths]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/megalith/${id}`
      );
      setMegalith((prevMegalith) =>
        prevMegalith.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting the item:", error);
      setError("Failed to delete item.");
    }
  };

  const handleSearchChange = (e) => {
    setSite(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

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
      {showTopButton && (
        <button className="scrollToTopButton" onClick={scrollToTop}>
          Go to Top
        </button>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="ListItemContainer">
          {error ? (
            <div className="errorMessage">{error}</div>
          ) : megalith.length > 0 ? (
            megalith.map((item) => (
              <ListItem
                key={item._id}
                site={item}
                // editId={editId}
                // setEditId={setEditId}
                setMegalith={setMegalith}
                megalith={megalith}
                handleDelete={() => handleDelete(item._id)}
              />
            ))
          ) : (
            <div className="noResults">No results found</div>
          )}
        </div>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default ListPage;
