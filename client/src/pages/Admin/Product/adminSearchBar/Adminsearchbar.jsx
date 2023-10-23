const Adminsearchbar = ({ setQuery, query }) => {
  const handleKeyDown = (e) => {
    setQuery(e.target.value);
  };
  return (
    <input
      className="adminsearchInput"
      type="text"
      placeholder="Search for product to edit or delete"
      onChange={handleKeyDown}
      value={query}
      onKeyDown={handleKeyDown}
    />
  );
};
export default Adminsearchbar;
