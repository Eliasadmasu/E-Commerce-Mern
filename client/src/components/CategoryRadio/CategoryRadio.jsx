import "./catradio.css";

const CategoryRadio = ({ value, category, selectedCategory, onChange }) => {
  return (
    <div className="wholeCat">
      <label className="radio-button" htmlFor={category}>
        <input
          type="radio"
          className="radio"
          id={category}
          name="category"
          value={value}
          checked={category === selectedCategory}
          onChange={() => onChange(category)}
        />
        <span className="radio"></span>
        {value}
      </label>
    </div>
  );
};
export default CategoryRadio;
