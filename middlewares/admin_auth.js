import jwt from "jsonwebtoken"
import { Admin } from "../models/Admin_models.js"

export const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin || decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    req.user = admin;
    req.user.role = "admin";

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};