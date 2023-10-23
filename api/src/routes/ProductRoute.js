import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import upload from "../config/config.js";
import {
  CreateProduct,
  GetAllProduct,
  UpdateProduct,
  filterdList,
  productDetail,
  DeleteProduct,
  SearchProduct,
  AddComment,
  UpdateComment,
  CurrentUserId,
  DeleteComment,
  CreateReplyComment,
  FetchReplyMessage,
  DeleteReply,
  CreateRating,
} from "../controllers/Products.js";
import adminCheck from "../middleware/adminCheckMiddleware.js";

const productRouter = express.Router();

//Create individual product
productRouter.post("/create", upload, verifyToken, adminCheck, CreateProduct);

//Get Every product
productRouter.get("/get", GetAllProduct);

//Search product
productRouter.get("/search", SearchProduct);

//Update product
productRouter.put(
  "/update/:productId",
  upload,
  verifyToken,
  adminCheck,
  UpdateProduct
);

//Delete product
productRouter.delete(
  "/delete/:productId",
  verifyToken,
  adminCheck,
  DeleteProduct
);

//Filter Product
productRouter.get("/filterdby", filterdList);

// Product Detail
productRouter.get("/detail/:productId", productDetail);

//Comment
productRouter.post("/:productId/comment", verifyToken, AddComment);

//Comment Update
productRouter.put("/:productId/comment/:commentID", verifyToken, UpdateComment);

//Comment Delete
productRouter.delete(
  "/:productId/comment/:commentID",
  verifyToken,
  DeleteComment
);

//Create Reply
productRouter.get(
  "/:productId/comment/:commentID/reply/fetch",
  FetchReplyMessage
);

//Create Reply
productRouter.post(
  "/:productId/comment/:commentID/reply",
  verifyToken,
  CreateReplyComment
);

//Create Reply
productRouter.delete(
  "/:productId/comment/:commentID/reply/:replyId/delete",
  verifyToken,
  DeleteReply
);

//Create rating
productRouter.post("/:productId/rating", verifyToken, CreateRating);

//Current User
productRouter.get("/user", verifyToken, CurrentUserId);

export { productRouter };
