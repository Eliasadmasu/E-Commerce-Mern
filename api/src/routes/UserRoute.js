import express from "express";
import {
  Protected,
  UserLogin,
  UserRegistration,
  refreshToken,
} from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();
//register user
router.post("/register", UserRegistration);

//login user
router.post("/login", UserLogin);

//refreshToken
router.post("/refresh", refreshToken);

//protected routes for test
router.get("/protected", verifyToken, Protected);

export { router };
