import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  AddToCart,
  CheckoutStripe,
  StripeWebHook,
  clearCart,
  deleteCartItem,
  getAllOrders,
  getCartItemCount,
  getCartItems,
  getCartTotal,
  orderDetail,
  updateQuantity,
} from "../controllers/ShoppingCartController.js";
import adminCheck from "../middleware/adminCheckMiddleware.js";

const CartRouter = express.Router();
//add to cart
CartRouter.post("/:productId/addtocart", verifyToken, AddToCart);

//Cart list
CartRouter.get("/cartlist", verifyToken, getCartItems);

//Cart Quantitiy Update
CartRouter.put("/:cartItemId/updateQuantity", verifyToken, updateQuantity);

//Cart Delete
CartRouter.delete("/:cartItemId/deleteitem", verifyToken, deleteCartItem);

//Cart Total
CartRouter.get("/total", verifyToken, getCartTotal);

//Number of Cart item
CartRouter.get("/count", verifyToken, getCartItemCount);

//Clear Cart item
CartRouter.delete("/clear", verifyToken, clearCart);

//Checkout item
CartRouter.post("/payment/charge", verifyToken, CheckoutStripe);

//Stripe Webhook
CartRouter.post("/webhook", StripeWebHook);

// !Orders
// !Orders
// !Orders

//Stripe Webhook
CartRouter.get("/order-list", verifyToken, adminCheck, getAllOrders);

//Stripe Webhook
CartRouter.get("/order-detail/:orderId", orderDetail);

export { CartRouter };
