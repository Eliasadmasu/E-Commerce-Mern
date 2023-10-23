import axios from "axios";
import API_URL from "../../../config/config";
import { useEffect, useState } from "react";
import "./dashboard.css";
import TotalRevenue from "./TotalRevenue";
import Totalorder from "./Totalorder";
import LineChart from "./LineChart";
import Chart from "chart.js/auto";
import randomColor from "randomcolor";
import RecentActivity from "./RecentActivity";
import BarChart from "./BarChart";

const DashBoard = () => {
  const [totalRevenue, setTotalRevenue] = useState("");
  const [percentage, setPercentage] = useState(0);
  // order
  const [totalOrder, setTotalOrder] = useState(0);
  const [OrderPercentage, setOrderPercentage] = useState(0);
  // leads
  //!
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Orders per Day",
        data: [],
        backgroundColor: "#1d8d3f",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  //customer
  const [customerData, setCustomer] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Customer per Day",
        data: [],
        backgroundColor: "#1d8d3f",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  //!

  //total revenue
  const Total = async () => {
    try {
      const totalRevenueRes = await axios.get(
        `${API_URL}/dashboard/total-revenue`
      );
      if (totalRevenueRes.status === 200) {
        setTotalRevenue(totalRevenueRes.data.totalRevenue[0].total);
        setPercentage(totalRevenueRes.data.revenuePercentage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //total order
  const TotalOrder = async () => {
    try {
      const totalOrderRes = await axios.get(`${API_URL}/dashboard/total-order`);
      if (totalOrderRes.status === 200) {
        setTotalOrder(totalOrderRes.data.totalOrder);

        setOrderPercentage(totalOrderRes.data.OrderPercentage);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //total order
  const TotalCustomerOrder = async () => {
    try {
      const totalOrderPerMonthRes = await axios.get(
        `${API_URL}/dashboard/total-order-month`
      );
      const data = totalOrderPerMonthRes.data.totalOrders;
      const labels = data.map((item) => `Day-${item._id.day}`);
      const orderCounts = data.map((item) => item.totalOrder);

      //
      const randomColors = randomColor({
        count: orderCounts.length, // Number of bars
        luminosity: "light", // You can adjust luminosity if needed
      });
      //
      setChartData({
        ...chartData,
        labels: labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: orderCounts,
            backgroundColor: randomColors,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };
  const TotalCustomerPD = async () => {
    try {
      const totalCustomerPerMonthRes = await axios.get(
        `${API_URL}/dashboard/total-customers-per-day`
      );
      const data = totalCustomerPerMonthRes.data.totalCustomersPD;
      const labels = data.map((item) => `Day-${item._id.day}`);
      const CustomerCounts = data.map((item) => item.totalCustomers);

      //
      const randomColors = randomColor({
        count: CustomerCounts.length, // Number of bars
        luminosity: "light", // You can adjust luminosity if needed
      });
      // //
      setCustomer({
        ...customerData,
        labels: labels,
        datasets: [
          {
            ...customerData.datasets[0],
            data: CustomerCounts,
            backgroundColor: randomColors,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Total();
    TotalOrder();
    TotalCustomerOrder();
    TotalCustomerPD();
  }, []);
  const width = "400px";

  const barStyle = {
    width: `${percentage}%`,
    maxWidth: "100%",
    height: "100%",
  };
  const totalPercent = {
    width: `${width}`,
  };
  //order
  const barStyleOrder = {
    width: `${OrderPercentage}%`,
    maxWidth: "100%",
    height: "100%",
  };
  //order

  return (
    <div className="MainWrapperDashBoard">
      <div className="dashboardTitle">DashBoard</div>
      <div className="DashboardPercentCont">
        <div className="flexedPercent">
          <TotalRevenue
            Text={"Total-Revenue"}
            totalRevenue={totalRevenue}
            totalPercent={totalPercent}
            barStyle={barStyle}
            percentage={percentage}
          />
          <Totalorder
            totalRevenue={totalOrder}
            totalPercent={totalPercent}
            barStyle={barStyleOrder}
            percentage={OrderPercentage}
          />
        </div>
        {/* order */}
        <div className="lineChartCont">
          <BarChart chartData={chartData} />
        </div>
        {/* Customer */}
        <div className="CustomreAndRecentCont">
          <div>
            <RecentActivity />
          </div>
          <div className="lineChartContCustomer">
            <LineChart chartData={customerData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
