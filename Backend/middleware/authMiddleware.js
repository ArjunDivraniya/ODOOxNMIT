import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Verify token and attach user
export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = await User.findById(decoded.id || decoded.userId).select("-password");
    
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

// Restrict to specific role(s)
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Access denied for role: ${req.user.role}` });
    }
    next();
  };
};
