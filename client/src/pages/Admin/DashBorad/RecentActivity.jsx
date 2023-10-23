import axios from "axios";
import API_URL from "../../../config/config";
import { useEffect, useState } from "react";

const RecentActivity = () => {
  const [recentPurchase, setRecentPurchase] = useState(null);

  const RecentActivity = async () => {
    try {
      const recentActivityRes = await axios.get(
        `${API_URL}/dashboard/recent-purchases`
      );
      if (recentActivityRes.status === 200) {
        setRecentPurchase(recentActivityRes.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    RecentActivity();
  }, []);

  const formatTime = (isoDate) => {
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${ampm}`;
  };
  const formatNumber = (number) => {
    return number.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  return (
    <div className="recentPurchaseWrapper">
      <div>Recent Purchase</div>
      {recentPurchase &&
        recentPurchase.recentPurchases.map((recent) => (
          <div key={recent._id} className="toTcrACont">
            <div className="toTcrACont second">
              <div className="recentTime">
                🤑 {formatTime(recent.createdAt)}{" "}
              </div>
              <div className="recentPurchaseNum">
                ${formatNumber(recent.totalAmount)}{" "}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default RecentActivity;
