import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/config";
import "./product.css";
import Filter from "../Filters/Filter";
import { useAuthContext } from "../../context/UserContext";
import SearchNotFound from "../../assets/noSearchFound.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const ProductList = () => {
  const navigate = useNavigate();

  const { searchQuery } = useAuthContext();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const {
    loading,
    setLoading,
    searchError,
    setSearchError,
    handleSearch,
    setSearchTerm,
    searchTerm,
  } = useAuthContext();

  const searchedProduct = async ({ query }) => {
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${API_URL}/product/search`, {
        params: { query }, // This should use searchQuery
      });
      console.log(
        "🚀 ~ file: ProductList.jsx:56 ~ searchedProduct ~ response:",
        response
      );

      if (response.status === 200) {
        setProducts(response.data.products);
        setLoading(false);
        setSearchError(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      setSearchError(true);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchedProduct({ query: searchQuery }); // If there's a search query, call searchedProduct()
    } else {
      searchedProduct({ query: "" }); // If there's no search query, call searchedProduct() with an empty query
    }
  }, [searchQuery]);

  return (
    <div className="main">
      <div className="filter">
        <Filter setProducts={setProducts} />
      </div>
      <div className="rightSide">
        {searchError ? (
          <div className="searchErr">
            <img src={SearchNotFound} alt="" />
            <h2>
              Sorry, no search found. <b className="text-red-500">:(</b>
            </h2>
          </div>
        ) : (
          <div>
            {loading ? (
              <div className="searchErr">
                <Loading />
              </div>
            ) : (
              <div className="WholeContproduct">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/productdetail/${product._id}`}
                    className="SignleCont  bg-white border-2;"
                  >
                    <img
                      className="img"
                      src={`${API_URL}/public/uploads/${product.imageUrl[0]}`}
                      alt={`Product`}
                      loading="lazy"
                    />
                    <div className="name">{product.name} </div>
                    <div className="desc text-zinc-700">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </div>
                    <div className="price ">${product.price} </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductList;
