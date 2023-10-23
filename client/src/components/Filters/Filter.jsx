import { useEffect, useState } from "react";
import CategoryRadio from "../CategoryRadio/CategoryRadio";
import "./filter.css";
import axios from "axios";
import API_URL from "../../config/config";
import MaxMinRadio from "../MaxMinRadio/MaxMinRadio";
import { useAuthContext } from "../../context/UserContext";

const Filter = ({ setProducts }) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isFilterButtonDisabled, setIsFilterButtonDisabled] = useState(true);
  const { setSearchError, setLoading } = useAuthContext();

  useEffect(() => {
    const fetchFilterd = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_URL}/product/filterdby?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        );
        console.log({ QueryFilterdproduct: response });

        const filteredProduct = response.data.filteredProducts;
        setProducts(filteredProduct);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    if (category || minPrice || maxPrice) {
      fetchFilterd();
    }
  }, [category, setProducts]);

  const handleFilter = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${API_URL}/product/filterdby?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      setProducts(response.data.filteredProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearFilter = async () => {
    setCategory("");
    setMaxPrice("");
    setMinPrice("");
    window.location.reload();
  };

  return (
    <>
      <div className="filterMain">
        <div>
          <h2 className="fitlerTitle"> Filter By Category</h2>
          <CategoryRadio
            category="Electronics"
            selectedCategory={category}
            onChange={setCategory}
            value={"Electronics"}
          />
          <CategoryRadio
            category="Sports%20%26%20Outdoors"
            selectedCategory={category}
            onChange={setCategory}
            value={"Sports & Outdoors"}
          />
          <CategoryRadio
            category="Beauty%20%26%20Personal%20Care"
            selectedCategory={category}
            onChange={setCategory}
            value={"Beauty & Personal Care"}
          />
          <CategoryRadio
            category="Gaming%20%Accessories"
            selectedCategory={category}
            onChange={setCategory}
            value={"Gaming Accessories"}
          />
          <CategoryRadio
            category="Books"
            selectedCategory={category}
            onChange={setCategory}
            value={"Books"}
          />
          <CategoryRadio
            category="Clothing"
            selectedCategory={category}
            onChange={setCategory}
            value={"Clothing"}
          />
          <CategoryRadio
            category="Furniture"
            selectedCategory={category}
            onChange={setCategory}
            value={"Furniture"}
          />
        </div>

        <h2 className="fitlerTitle">Filter by Price</h2>
        <div className="filterPriceCont">
          {/* min and max price */}
          <MaxMinRadio
            Title={"Min"}
            minPrice={minPrice}
            onChange={setMinPrice}
          />
          <MaxMinRadio
            Title={"Max"}
            minPrice={maxPrice}
            onChange={setMaxPrice}
          />
          <button
            onClick={handleFilter}
            className="bg-blue-600 p-2 hover:bg-blue-500 rounded-lg btn"
          >
            Go
          </button>
        </div>
        <button
          className="rounded-lg bg-teal-500 p-2 self-center hover:bg-teal-400 text-white"
          onClick={handleClearFilter}
        >
          Clear All Fitler
        </button>
      </div>
    </>
  );
};
export default Filter;
