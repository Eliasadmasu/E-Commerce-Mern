import "./home.css";
import HomeBgSlider from "../../components/HomeBgSlider/HomeBgSlider";
import HomeProduct from "../../components/homeProduct/HomeProduct";

const Home = () => {
  return (
    <>
      <div className="mainBg">
        <HomeBgSlider />
      </div>
      <div>
        <HomeProduct />
      </div>
    </>
  );
};
export default Home;
