const adminMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default adminMiddleware;