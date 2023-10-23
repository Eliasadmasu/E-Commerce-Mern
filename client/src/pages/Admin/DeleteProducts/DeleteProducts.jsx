import axios from "axios";
import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import API_URL from "../../../config/config";
import PopUpMessage from "../../../components/PopUpMessage/PopUpMessage";
import generateNewAccessToken from "../../../config/generateRefreshToken";
import Cookies from "js-cookie";

const DeleteProducts = ({ productId, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirm = async () => {
    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }

      const response = axios.delete(`${API_URL}/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      onDelete(productId);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="deleteCont">
      <div className="popcont">
        <button
          onClick={handleShowConfirmation}
          className="flex gap-1 justify-center items-center "
        >
          <RiDeleteBin6Fill size={23} className="deleteLogo" /> Delete
        </button>
      </div>
      {showConfirmation && (
        <PopUpMessage
          message={"Are you sure you want to delete this item?"}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};
export default DeleteProducts;
