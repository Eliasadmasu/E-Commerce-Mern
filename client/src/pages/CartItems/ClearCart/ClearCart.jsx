import Cookies from "js-cookie";
import generateNewAccessToken from "../../../config/generateRefreshToken";
import axios from "axios";
import API_URL from "../../../config/config";

const ClearCart = ({ FetchCartItems }) => {
  const clearCart = async () => {
    await generateNewAccessToken();

    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log("accessToken misiing");
    }
    const response = await axios.delete(`${API_URL}/cart/clear`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      FetchCartItems();
      console.log(response.data.message); // Cart cleared successfully
    }
  };

  return (
    <div>
      <button className="clearCartButton" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};
export default ClearCart;
