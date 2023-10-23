import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import "dotenv/config.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/token.config.js";

const isUserAdmin = async (email, password) => {
  const AdminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const emailMatches = email === AdminEmail;
  const ConfirmPassW = await bcrypt.compare(password, adminPasswordHash);

  return emailMatches && ConfirmPassW;
};

//! @POST api/register
//TODO @desc register user
//?@ Public
const UserRegistration = async (req, res) => {
  const { username, password, fullName, email, phoneNumber, gender } = req.body;
  try {
    // check if the username or email already exist
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    //check if user is found
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already in use." });
    }

    // admin checker
    const isAdmin = await isUserAdmin(email, password);

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //if no existing user found---=>
    const newUser = new UserModel({
      username,
      password: hashedPassword,
      fullName,
      email,
      phoneNumber,
      gender,
      role: isAdmin ? "admin" : "user",
    });
    //save the data in the data base
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.log(error);
  }
};

//! @POST api/login
//TODO @desc login user
//?@ Public
const UserLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    //user check

    const existingUser = await UserModel.findOne({ username });
    //checking if user exist
    if (!existingUser) {
      return res.status(401).json({ message: "User not found!" });
    }

    //checking if the password is valid ro correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    //if password is not correct
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credential." });
    }

    //generating accesstoken adn refreshtoken
    //

    const role = existingUser.role;
    const Id = existingUser._id.toJSON();
    //
    const accessToken = generateAccessToken({ role, Id });
    const refreshToken = generateRefreshToken({ role, Id });

    return res.status(200).json({ accessToken, refreshToken, role });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//! @POST api/protected
//TODO @desc protected route
//?@ private
const Protected = (req, res) => {
  res.status(200).json({ message: "Protected route accessed successfully" });
};

//! @POST api/refresh
//TODO @desc used to refresh accessToken
//?@ Public
const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is missing." });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid refresh token." });
    }

    const accessToken = generateAccessToken({
      decodedRtRole: decoded.role,
      decodedRtId: decoded.Id,
    });
    res.json({ accessToken });
  });
};

export { UserRegistration, UserLogin, Protected, refreshToken };
