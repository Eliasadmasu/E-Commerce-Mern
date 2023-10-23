import express from "express";
import {
  GetUser,
  RecentPurchase,
  TotalCustomerPerDay,
  //   TotalLeads,
  TotalOrders,
  TotalOrdersPerMonth,
  TotalRevenue,
  updateUserRole,
} from "../controllers/dashboardStats.js";

const DashboardRouter = express.Router();
//total revenue
DashboardRouter.get("/total-revenue", TotalRevenue);

//total revenue
DashboardRouter.get("/total-order", TotalOrders);

// total order per month
DashboardRouter.get("/total-order-month", TotalOrdersPerMonth);

// total order per month
DashboardRouter.get("/total-customers-per-day", TotalCustomerPerDay);

// recent purchase
DashboardRouter.get("/recent-purchases", RecentPurchase);

//Whole user
DashboardRouter.get("/users", GetUser);

//change user role
DashboardRouter.put("/users/:userId", updateUserRole);

export { DashboardRouter };
