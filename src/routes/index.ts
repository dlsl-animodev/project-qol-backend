import { Router } from "express";
import studentRoutes from "./studentRoutes";
import homeController from "../controllers/homeController";

const router = Router();

// home route
router.get("/", homeController);

// student/attendance routes
router.use("/api", studentRoutes);

export default router;