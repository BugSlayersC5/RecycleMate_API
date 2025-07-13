import { Pickup } from "../models/pickup_models.js";
import { pickupSchema } from "../schemas/pickup_schemas.js";


export const createPickup = async (req, res) => {
  try {
    const { error } = pickupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { wasteType, location, date, time } = req.body;

    const newPickup = await Pickup.create({
      user: req.user.id, 
      wasteType,
      location,
      date,
      time
    });

    res.status(201).json({
      message: "Pickup request created successfully.",
      pickup: newPickup
    });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong while creating the pickup." });
  }
};

export const getMyPickups = async (req, res) => {
  try {
    const myPickups = await Pickup.find({ user: req.user.id });

    res.status(200).json({
      message: "Here are your pickup requests.",
      pickups: myPickups
    });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong while fetching pickups." });
  }
};