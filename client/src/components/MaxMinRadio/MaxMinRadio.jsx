import "./MaxMinRadio.css";

const MaxMinRadio = ({ Title, minPrice, onChange }) => {
  return (
    <div className="minmaxmain">
      <input
        type="number"
        className="minmax outline-teal-400"
        value={minPrice}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder={`$ ${Title}`}
      />
    </div>
  );
};
export default MaxMinRadio;
