import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: String,
  fullName: String, // Full Name
  email: { type: String, unique: true }, // Email Address
  phoneNumber: String, // Phone Number
  gender: String,
});

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
