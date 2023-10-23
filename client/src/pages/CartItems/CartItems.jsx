import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../../config/config";
import generateNewAccessToken from "../../config/generateRefreshToken";
import Cookies from "js-cookie";
import "./carttem.css";
import { useAuthContext } from "../../context/UserContext";
import ClearCart from "./ClearCart/ClearCart";
import { Link } from "react-router-dom";
import CheckOut from "./CheckOut/CheckOut";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const { cartItemCount, fetchCartItemCount } = useAuthContext();
  // const apiKeyForStripe=process.env.PUBLISHABLE_KEY

  const handleItemDelete = async (cartItemId) => {
    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken missing");
        return;
      }

      const response = await axios.delete(
        `${API_URL}/cart/${cartItemId}/deleteitem`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        FetchCartItems();
        fetchTotal();
        fetchCartItemCount();
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken missing");
        return;
      }

      const response = await axios.put(
        `${API_URL}/cart/${cartItemId}/updateQuantity`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item._id === cartItemId ? { ...item, quantity: newQuantity } : item
          )
        );
        fetchTotal();
      }

      console.log(response);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const fetchTotal = async () => {
    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }

      const cartitemTotalResonse = await axios.get(`${API_URL}/cart/total`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (cartitemTotalResonse.status === 200) {
        setTotalValue(cartitemTotalResonse.data.totalValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // !
  const FetchCartItems = async () => {
    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }

      const cartitemsResonse = await axios.get(`${API_URL}/cart/cartlist`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (cartitemsResonse.status === 200) {
        setCartItems(cartitemsResonse.data.cartItems);
      }
      console.log(cartitemsResonse);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    FetchCartItems();
    fetchTotal();
  }, [cartItems.length]);

  return (
    <div className="cartItemsWrapper">
      <div className="itemsWrapper">
        <div className="title">Shopping Cart</div>
        {cartItems > 0 && (
          <div className="clearcart">
            <ClearCart FetchCartItems={FetchCartItems} />
          </div>
        )}
        {cartItems.length > 0 ? (
          <div className="itemsCont">
            {cartItems.map((cartitem) => (
              <div className="items" key={cartitem._id}>
                <div className="imageCont">
                  <img
                    className="itemimage"
                    src={`${API_URL}/public/uploads/${cartitem.product.imageUrl[0]}`}
                    alt=""
                  />
                </div>
                <div className="itemDetailCont">
                  <div className="cartitemName">{cartitem.product.name}</div>
                  <div className="cartitemPrice">
                    ${cartitem.product.price.toLocaleString()}
                  </div>
                  <div className="cartitemGift">
                    <span className="shippedFrom">Shipped from:</span>
                    <span className="brand"> {cartitem.product.name}</span>
                  </div>
                  <div className="giftAvalablity">
                    Gift options not available.Gift options not available.
                  </div>
                  {/*  */}
                  <div className="quantityAndDeleteCont">
                    <div className="quantitiyAdd">
                      <div>
                        Quantity:
                        <select
                          className="select"
                          value={cartitem.quantity}
                          onChange={(e) =>
                            updateQuantity(cartitem._id, e.target.value)
                          }
                        >
                          {[...Array(10)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/*  */}
                    <div
                      className="deleteitemBtn"
                      onClick={() => handleItemDelete(cartitem._id)}
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="total">
              Subtotal ({cartItemCount} item):{" "}
              <span> ${totalValue.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="noItemCont">
            Your Cart is Empty.{" "}
            <Link to={"/product"} className="StoreLink">
              Go to Store
            </Link>
          </div>
        )}
        {/*  */}
      </div>
      <div className="checkoutsWrapper">
        <div className="totalTwo">
          Subtotal ({cartItemCount} item):{" "}
          <span> ${totalValue.toFixed(2)}</span>
        </div>
        {cartItems.length > 0 && <CheckOut cartItems={cartItems} />}
      </div>
    </div>
  );
};
export default CartItems;
