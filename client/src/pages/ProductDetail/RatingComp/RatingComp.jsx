import { useState } from "react";
import "./ratingcomp.css";
import { Button, Rating, Typography } from "@mui/material";
import axios from "axios";
import API_URL from "../../../config/config";
import generateNewAccessToken from "../../../config/generateRefreshToken";
import Cookies from "js-cookie";

const RatingComp = ({ productId }) => {
  const [value, setValue] = useState(null);
  //   const [customerRating, setCustomerRating] = useState(4);

  const handleRating = async (e) => {
    e.preventDefault();

    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }
      const response = await axios.post(
        `${API_URL}/product/${productId}/rating`,
        { value },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ratingCont">
      <div>Write Your Review</div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <button className="submitratingBtn" onClick={handleRating}>
        Submit Rating
      </button>
      {/* <div>
        <div>Customer Reviews</div>
        <Rating
          name="simple-controlled"
          value={customerRating}
          onChange={(e, newValue) => {
            setCustomerRating(newValue);
          }}
        />
        <span>Based on 1624 reviews</span>
      </div> */}
    </div>
  );
};

export default RatingComp;
