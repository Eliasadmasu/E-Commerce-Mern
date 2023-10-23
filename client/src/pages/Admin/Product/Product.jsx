import { Link } from "react-router-dom";
import "./product.css";
import API_URL from "../../../config/config";
import Loading from "../../../components/Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../context/UserContext";
import { Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import DeleteProducts from "../DeleteProducts/DeleteProducts";
import SearchNotFound from "../../../assets/noSearchFound.svg";
import Adminsearchbar from "./adminSearchBar/Adminsearchbar";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const {
    loading,
    setLoading,
    searchError,
    setSearchError,
    // showConfirmation,
    // setShowConfirmation,
  } = useAuthContext();

  console.log(products);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await axios.get(`${API_URL}/product/search`, {
          params: { query }, // This should use searchQuery
        });
        if (response.status === 200) {
          setProducts(response.data.products);
        }
        setLoading(false);
        setSearchError(false);
      } catch (error) {
        setSearchError(true);
        setLoading(false);
        console.error(error);
      }
    };
    fetchProductList();
  }, [query, setLoading, setSearchError]);

  const handleDelete = (deletedProductId) => {
    // ?
    const updateProduct = products.filter(
      (product) => product._id !== deletedProductId
    );
    // ?
    setProducts(updateProduct);
  };
  if (loading) {
    return (
      <div className="LoadingWrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div className="main">
      {searchError ? (
        <div className="searchErr">
          <img src={SearchNotFound} alt="aa" />
          <h2>
            Sorry, no search found. <b className="text-red-500">:(</b>
          </h2>
        </div>
      ) : (
        <div className="wholeContainer">
          <div className="createsearchCont">
            <div className="adminsearchbar">
              <Adminsearchbar setQuery={setQuery} query={query} />
            </div>
            <div className="buttonCreateNew">
              <Link to={`/adminDashBoard/create`}>
                <Button className="createBtn" variant="contained">
                  Create New
                </Button>
              </Link>
            </div>
          </div>
          <div className="WholeContproduct">
            {products.map((product) => (
              <div
                key={product._id}
                to={`/productdetail/${product._id}`}
                className="SignleCont second  bg-white border-2;"
              >
                <img
                  className="img"
                  src={`${API_URL}/public/uploads/${product.imageUrl[0]}`}
                  alt={`Product`}
                />
                <div className="name">{product.name} </div>
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: product.description,
                  }}
                />
                <div className="price ">${product.price} </div>
                <div className="editDeleteCont">
                  <Link to={`/update/${product._id}`}>
                    <div className="flex gap-1 ">
                      <AiFillEdit size={23} className="updateLogo" />
                      Edit
                    </div>
                  </Link>
                  <div>
                    <DeleteProducts
                      productId={product._id}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;
