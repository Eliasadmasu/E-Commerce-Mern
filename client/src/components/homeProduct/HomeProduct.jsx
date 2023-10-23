import CatProduct from "../CatProduct/catProduct";
import "./homeproduct.css";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  return (
    <div className="mainHome">
      <CatProduct
        Catagory={"Electronics"}
        img={
          "https://img.freepik.com/premium-photo/futuristic-gadgets-showcase-lineup-sleek-modern-technological-devices_977107-683.jpg"
        }
      />
      <CatProduct
        Catagory={"Fitness"}
        img={"https://m.media-amazon.com/images/I/71AyxR0yeeL.jpg"}
      />
      <CatProduct
        Catagory={"Clothing"}
        img={
          "https://i0.pickpik.com/photos/573/909/315/store-clothes-clothing-line-preview.jpg"
        }
      />
      <CatProduct
        Catagory={"furniture"}
        img={
          "https://images.thdstatic.com/productImages/6127f383-b8d5-4455-9bcf-3ff111898d46/svn/tortuga-outdoor-patio-conversation-sets-rio-6pc-seating-64_1000.jpg"
        }
      />
      <CatProduct
        Catagory={"Beauty and Personal Care"}
        img={
          "https://allurebeautybox.com/cdn/shop/files/mobile-evergreen.png?v=1654923249"
        }
      />
      <CatProduct
        Catagory={"Books"}
        img={
          "https://libromaniacs.com/wp-content/uploads/2023/06/books-set-in-libraries.jpg"
        }
      />
    </div>
  );
};
export default HomeProduct;
