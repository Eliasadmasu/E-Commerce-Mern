import axios from "axios";
import API_URL from "../../../config/config";
import generateNewAccessToken from "../../../config/generateRefreshToken";
import Cookies from "js-cookie";

const DeleteComment = ({ commentId, productId, onDeleteComment }) => {
  const handleDeleteComment = async (e) => {
    e.preventDefault();

    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }

      const response = await axios.delete(
        `${API_URL}/product/${productId}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        onDeleteComment();
      }
      console.log({ deleteRed: response });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Editpointer" onClick={handleDeleteComment}>
      Delete
    </div>
  );
};
export default DeleteComment;
