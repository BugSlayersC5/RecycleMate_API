import { Router } from "express";
import {  loginAdmin, createCollectorByAdmin, getAllUsers, getAllCollectors,  deleteUser, deleteCollector, approveCollector, getAllPickups, assignCollectorToPickup} from "../controllers/admin_controller.js";
import { authenticateAdmin } from "../middlewares/admin_auth.js";

export const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/collectors", authenticateAdmin, createCollectorByAdmin);
adminRouter.get("/users", authenticateAdmin, getAllUsers);
adminRouter.get("/collectors", authenticateAdmin, getAllCollectors);
adminRouter.delete("/users/:id", authenticateAdmin, deleteUser);
adminRouter.delete("/collectors/:id", authenticateAdmin, deleteCollector);
adminRouter.patch("/collectors/:id/approve", authenticateAdmin, approveCollector);
adminRouter.get("/pickups", authenticateAdmin, getAllPickups);
adminRouter.patch("/pickups/:pickupId/assign", authenticateAdmin, assignCollectorToPickup);