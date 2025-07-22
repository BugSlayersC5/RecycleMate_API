import { Router } from "express";
import { signupCollector, loginCollector, viewAllPickups, getUserPickups, completePickup } from "../controllers/collector_controller.js"
import { authenticateCollector } from "../middlewares/collector_auth.js"; 

export const collectorRouter = Router();


collectorRouter.post("/signup", signupCollector);
collectorRouter.post("/login", loginCollector);
collectorRouter.get("/pickups", authenticateCollector, viewAllPickups);
collectorRouter.get("/pickups/user/:userId", authenticateCollector, getUserPickups);
collectorRouter.patch("/pickups/:id/complete", authenticateCollector, completePickup);
