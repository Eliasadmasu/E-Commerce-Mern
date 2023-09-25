import jwt from "jsonwebtoken";
import "dotenv/config";

// Secret key to sign and verify tokens

// Function to generate an access token
function generateAccessToken(user) {
  // Payload includes user ID and any other necessary data
  console.log(user);
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

// Function to generate a refresh token
function generateRefreshToken(user) {
  console.log(user);

  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

export { generateAccessToken, generateRefreshToken };
