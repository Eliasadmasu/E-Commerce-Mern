const Sort = ({ sortBy, sortOrder, onSortChange, onSortChangeOrder }) => {
  return (
    <div className="sortContainer">
      <label className="sortLabel" htmlFor="sortBy">
        Sort By:
      </label>
      <select
        className="sortSelect"
        id="sortBy"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="role">Role</option>
        <option value="createdAt">Created At</option>
        <option value="username">User Name</option>
        <option value="gender">Gender</option>
        {/* Add more options based on your data */}
      </select>
      <label className="sortLabel" htmlFor="sortOrder">
        Sort Order:
      </label>
      <select
        className="sortSelect"
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => onSortChangeOrder(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};
export default Sort;
