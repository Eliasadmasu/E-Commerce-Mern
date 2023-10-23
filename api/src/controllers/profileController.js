import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

const UserProfile = async (req, res) => {
  const { decodedRtId } = req.user;

  try {
    const user = await UserModel.findById(decodedRtId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateProfile = async (req, res) => {
  const userId = req.params.userId;
  const { fullName, email, phoneNumber, gender } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        fullName,
        email,
        phoneNumber,
        gender,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { UserProfile, UpdateProfile };
