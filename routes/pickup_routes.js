import { Router } from "express";
import { createPickup, getMyPickups } from "../controllers/pickup_controller.js";
import { authenticate } from "../middlewares/auth.js";

export const pickupRouter = Router();

pickupRouter.post("/", authenticate, createPickup);

pickupRouter.get("/mine", authenticate, getMyPickups);
