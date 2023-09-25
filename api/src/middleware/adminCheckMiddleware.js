const adminCheck = (req, res, next) => {
  const userRole = req.user.decodedRtRole;
  console.log({ userFromadmincheck: userRole });
  const checkrole = userRole === "admin";
  console.log({ checkrole: !!checkrole });

  if (checkrole) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. You are not an admin." });
  }
};

export default adminCheck;
