import axios from "axios";
import API_URL from "../../../config/config";
import generateNewAccessToken from "../../../config/generateRefreshToken";
import Cookies from "js-cookie";

const CheckOut = ({ cartItems }) => {
  const handleCheckout = async () => {
    await generateNewAccessToken();

    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log("accessToken missing");
      return;
    }
    axios
      .post(
        `${API_URL}/cart/payment/charge`,
        { items: cartItems },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.url) {
          console.log({ res });
          // window.location.href = res.data.url;
          window.location.assign(res.data.url);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <button className="checkoutBtn" onClick={handleCheckout}>
        Proceed to checkout
      </button>
    </div>
  );
};
export default CheckOut;
