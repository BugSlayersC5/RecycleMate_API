import { collectorLoginSchema } from "../schemas/collector_schemas.js";
import { Pickup } from "../models/pickup_models.js";
import { Collector } from "../models/collector_models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const loginCollector = async (req, res) => {
  const { error } = collectorLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const { email, password } = req.body;

    const collector = await Collector.findOne({ email });
    if (!collector) {
      return res.status(400).json({ message: "Wrong email" });
    }

    const match = await bcrypt.compare(password, collector.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: collector.id, role: "collector" }, process.env.JWT_SECRET, {
      expiresIn: "3h"
    });

    res.status(200).json({ collector, token });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong during login." });
  }
};

// collector view all pickups 
export const viewAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ status: "pending" });
    res.status(200).json({ pickups });
  } catch (err) {
    res.status(500).json({ message: "Error loading pickups" });
  }
};

// collector views pickup of a user
export const getUserPickups = async (req, res) => {
  try {
    const { userId } = req.params;

    const pickups = await Pickup.find({ user: userId });

    if (pickups.length === 0) {
      return res.status(404).json({ message: "No pickups found for this user." });
    }

    res.status(200).json({
      message: "Pickups found for the user.",
      data: pickups
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong while getting pickups." });
  }
};

// Marks the pickup as complete 
export const completePickup = async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    pickup.status = "completed";
    await pickup.save();

    res.status(200).json({ message: "Pickup marked as completed", pickup });
  } catch (err) {
    res.status(500).json({ message: "Error updating pickup" });
  }
};