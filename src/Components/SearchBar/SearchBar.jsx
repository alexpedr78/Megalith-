import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={onChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
