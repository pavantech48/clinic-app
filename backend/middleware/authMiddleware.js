import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // token format: Bearer <token>
    const actualToken = token.split(" ")[1];

    // verify token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded; // store user info

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;  