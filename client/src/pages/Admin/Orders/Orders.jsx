import { useEffect, useState } from "react";
import axios from "axios";
import "./order.css";
import API_URL from "../../../config/config";
import generateNewAccessToken from "../../../config/generateRefreshToken";
import Cookies from "js-cookie";
import OrdersCards from "./OrdersCards";
import Loading from "../../../components/Loading/Loading";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  console.log({ username });
  console.log({ orders });

  useEffect(() => {
    const FetchOrder = async () => {
      setLoading(true);
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken missing");
        return;
      }

      try {
        const OrderRes = await axios.get(`${API_URL}/cart/order-list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (OrderRes.status === 200) {
          setOrders(OrderRes.data.orders);
          setUsername(OrderRes.data.username);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };
    FetchOrder();
  }, []);

  // !loading
  if (loading) {
    return (
      <div className="LoadingWrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="mainTitle">Orders</div>
      <div className="Totalorder">
        Total Order:
        <span className="totalOrderTxt">{orders.length}</span>
      </div>
      <div className="clickDetail">Click The User For Detail</div>
      <table className="ordersTable">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Date</th>
            <th>User ID</th>
            <th>Total</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {orders.map((order, index) => (
              <OrdersCards
                order={order}
                key={order._id}
                index={index}
                orderId={order._id}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
export default Orders;
