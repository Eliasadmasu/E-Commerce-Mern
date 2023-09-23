import axios from "axios";
import API_URL from "./config";
import Cookies from "js-cookie";

const generateNewAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    const response = await axios.post(`${API_URL}/api/refresh`, {
      refreshToken,
    });

    const refreshedAceessToken = response.data.accessToken;

    Cookies.set("accessToken", refreshedAceessToken, {
      expires: 1 / 24,
      secure: true,
    }); //!add expire date it it work
  } catch (error) {
    console.error("Token refresh failed:", error);
  }
};
export default generateNewAccessToken;
