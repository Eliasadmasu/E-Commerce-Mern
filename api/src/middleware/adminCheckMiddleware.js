const adminCheck = (req, res, next) => {
  const userRole = req.user.decodedRtRole;
  const checkrole = userRole === "admin";

  if (checkrole) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. You are not an admin." });
  }
};

export default adminCheck;
