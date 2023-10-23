import UserModel from "../models/UserModel.js";
import Order from "../models/orderModel.js";

const TotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: `$totalAmount` },
        },
      },
    ]);
    const revenuePercentage = (totalRevenue[0].total / 30000000) * 100;
    res.json({ totalRevenue, revenuePercentage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const TotalOrders = async (req, res) => {
  try {
    const totalOrder = await Order.countDocuments();
    const OrderPercentage = (totalOrder / 30000) * 100;

    res.json({ totalOrder, OrderPercentage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//
const TotalOrdersPerMonth = async (req, res) => {
  try {
    const totalOrders = await Order.aggregate([
      {
        $group: {
          _id: { day: { $dayOfMonth: "$createdAt" } }, // Group by day of the month
          totalOrder: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.day": 1 }, // Sort the results by day of the month
      },
    ]);
    res.json({ totalOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const TotalCustomerPerDay = async (req, res) => {
  try {
    const totalCustomersPD = await UserModel.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
          },
          totalCustomers: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 },
      },
    ]);
    res.status(200).json({ totalCustomersPD });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const RecentPurchase = async (req, res) => {
  try {
    const recentPurchases = await Order.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({ recentPurchases });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Profile and Customer

const GetUser = async (req, res) => {
  const { sortBy, sortOrder } = req.query;
  try {
    let user;
    if (sortBy && sortOrder) {
      user = await UserModel.find().sort({
        [sortBy]: sortOrder === "asc" ? 1 : -1,
      });
    } else {
      user = await UserModel.find();
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    await UserModel.findByIdAndUpdate(userId, { role });

    res.status(200).json({ message: "User role updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  TotalRevenue,
  TotalOrders,
  TotalOrdersPerMonth,
  RecentPurchase,
  TotalCustomerPerDay,
  GetUser,
  updateUserRole,
};
