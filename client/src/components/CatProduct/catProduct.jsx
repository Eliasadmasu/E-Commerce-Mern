import { Link } from "react-router-dom";
import "./catpro.css";

const CatProduct = ({ Catagory, img }) => {
  return (
    <div className="eachCont bg-slate-300">
      <h3>{Catagory}</h3>
      <img src={img} alt="" />
      <Link>See more</Link>
    </div>
  );
};
export default CatProduct;
