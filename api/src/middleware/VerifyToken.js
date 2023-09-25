import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authTokenHeader = req.headers.authorization?.split(" ")[1];

  if (!authTokenHeader) {
    return res.status(401).json({ message: "Access token is missing." });
  }

  jwt.verify(
    authTokenHeader,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token." });
      }

      // Attach the decoded user data to the request object for further use

      console.log(decoded);
      req.user = decoded;
      next();
    }
  );
};

export { verifyToken };
