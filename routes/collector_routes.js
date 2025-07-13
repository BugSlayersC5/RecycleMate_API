import { Router } from "express";
import { loginCollector, viewAllPickups, getUserPickups, completePickup } from "../controllers/collector_controller.js";


import { authenticateCollector } from "../middlewares/controller_auth.js"; 

export const collectorRouter = Router();


collectorRouter.post("/login", loginCollector);
collectorRouter.get("/pickups", authenticateCollector, viewAllPickups);
collectorRouter.get("/pickups/user/:userId", authenticateCollector, getUserPickups);
collectorRouter.patch("/pickups/:id/complete", authenticateCollector, completePickup);
