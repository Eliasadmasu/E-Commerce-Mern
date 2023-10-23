import axios from "axios";
import API_URL from "../../../config/config";
import { Link, useNavigate } from "react-router-dom";

const OrdersCards = ({ order, index, orderId }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const formattedDate = new Date(dateString).toLocaleString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleOrderDetail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/cart/order-detail/${orderId}`);
      console.log({ orderDetail: res });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoute = () => {
    navigate(`/admin/orders-detail/${orderId}`);
  };

  return (
    <tr className="detailOrderCont">
      <td>{index + 1}</td>
      <td onClick={handleRoute} className="usernameBtn">
        <Link onClick={handleOrderDetail}>{order?.userId?.username}</Link>
      </td>
      <td>{formatDate(order.createdAt)}</td>
      <td>{order._id}</td>
      <td className="ProPrice">${order.totalAmount.toLocaleString()}</td>
    </tr>
  );
};
export default OrdersCards;
