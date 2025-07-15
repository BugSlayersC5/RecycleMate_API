import jwt from "jsonwebtoken"
import { Collector } from "../models/collector_models.js"


export const authenticateCollector = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const collector = await Collector.findById(decoded.id).select("-password");

    if (!collector || decoded.role !== "collector") {
      return res.status(401).json({ message: "Access denied: Invalid collector token" });
    }

    req.user = collector;
    req.user.role = "collector";

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};