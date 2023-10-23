import express from "express";
import {
  UpdateProfile,
  UserProfile,
} from "../controllers/profileController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const ProfileRouter = express.Router();

// user profile
ProfileRouter.get("/profile", verifyToken, UserProfile);

// user profile update
ProfileRouter.put("/:userId", UpdateProfile);

export { ProfileRouter };
