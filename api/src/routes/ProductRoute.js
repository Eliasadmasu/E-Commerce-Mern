import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import upload from "../config/config.js";
import { CreateProduct } from "../controllers/Products.js";
import adminCheck from "../middleware/adminCheckMiddleware.js";

const productRouter = express.Router();

//Create individual product
productRouter.post(
  "/create",
  upload.single("image", 2),
  verifyToken,
  adminCheck,
  CreateProduct
);

export { productRouter };
