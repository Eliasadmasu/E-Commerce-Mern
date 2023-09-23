import jwt from "jsonwebtoken";
import "dotenv/config";

// Secret key to sign and verify tokens

// Function to generate an access token
function generateAccessToken(userId) {
  // Payload includes user ID and any other necessary data
  console.log({ IdAcc: userId });
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

// Function to generate a refresh token
function generateRefreshToken(userId) {
  const payload = { IdRT: userId };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

export { generateAccessToken, generateRefreshToken };
