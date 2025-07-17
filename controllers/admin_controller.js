import { Admin } from "../models/admin_models.mjs";
import { Collector } from "../models/collector_models.mjs";
import { User } from "../models/user_models.js";
import { adminLoginSchema } from "../schemas/admin_schemas.js";
import bcrpt from "bcrypt"
import jwt from "jsonwebtoken"

// Admin login 
export const loginAdmin = async (req, res) => {
  const { error } = adminLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Wrong email" });
    }

    const match = await bcrpt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({ admin, token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// Admin creates collectors account
export const createCollectorByAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existing = await Collector.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Collector already exists" });
    }

    const hashedPassword = await bcrpt.hash(password, 12);

    const collector = await Collector.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Collector account created successfully",
      collector
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating collector" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Admin views all collectors
export const getAllCollectors = async (req, res) => {
  try {
    const collectors = await Collector.find().select("-password");
    res.status(200).json({ collectors });
  } catch (err) {
    res.status(500).json({ message: "Error fetching collectors" });
  }
};

// Admin deletes a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

// Admin deletes a collector
export const deleteCollector = async (req, res) => {
  try {
    const collector = await Collector.findByIdAndDelete(req.params.id);

    if (!collector) {
      return res.status(404).json({ message: "Collector not found" });
    }

    res.status(200).json({ message: "Collector deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting collector" });
  }
};