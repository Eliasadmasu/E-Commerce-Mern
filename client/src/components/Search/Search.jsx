// import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/UserContext";
import { useEffect } from "react";

const Search = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/product");
      handleSearch(searchTerm);
    }
  };
  useEffect(() => {
    // Clear searchTerm and query when location changes
    return () => {
      // Clear searchTerm when the component unmounts
      if (location.pathname === "/product") {
        handleSearch("");
        setSearchTerm("");
      }
    };
  }, [location.pathname]);

  return (
    <div className="Search">
      <input
        className="searchInput"
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        value={searchTerm}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleKeyDown}>
        <HiSearch size={20} className="searchIcon" />
      </button>
    </div>
  );
};
export default Search;
