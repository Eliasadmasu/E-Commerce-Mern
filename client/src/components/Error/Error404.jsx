import pagenotFound from "../../assets/pagenotfound.svg";
import "./error404.css";

const Error404 = () => {
  return (
    <div className="notfoundCont">
      <div className="imgTxt">
        <img src={pagenotFound} alt="404 not found" className="notfoundimg" />
        <div className="txtnotfound">Page Not Found</div>
      </div>
    </div>
  );
};
export default Error404;
