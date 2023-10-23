import axios from "axios";
import API_URL from "../../../../config/config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./orderDetail.css";
import Loading from "../../../../components/Loading/Loading";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log({ orderDetail });

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const orderDetailRes = await axios.get(
          `${API_URL}/cart/order-detail/${orderId}`
        );
        console.log(orderDetailRes);
        setOrderDetail(orderDetailRes.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [orderId]);

  if (loading) {
    return (
      <div className="LoadingWrapper">
        <Loading />
      </div>
    );
  }
  return (
    <div className="orderDetailWrapper">
      {orderDetail && !loading && (
        <div className="orderDetail">
          {orderDetail.products.map((productItem) => (
            <div key={productItem._id} className="orderDetailCont">
              <div className="orderDetailimageCont">
                <img
                  src={
                    productItem.product &&
                    productItem.product.imageUrl &&
                    productItem.product.imageUrl[0]
                      ? `${API_URL}/public/uploads/${productItem.product.imageUrl[0]}`
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className="orderDetailTxt">
                <h4>
                  Name:
                  <span>{productItem.product.name}</span>
                </h4>
                <p>
                  Price:
                  <span> ${productItem.product.price.toLocaleString()}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default OrderDetail;
