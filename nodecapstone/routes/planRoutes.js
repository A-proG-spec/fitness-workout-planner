import express from "express";
import {
  createPlan,
  getPlans,
  getDailyPlans,
  getWeeklyPlans,
  completeWorkout,
  updatePlan,
  deletePlan,
} from "../controllers/planControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// Plan Routes
router.post("/", createPlan);
router.get("/", getPlans);
router.get("/daily", getDailyPlans);
router.get("/weekly", getWeeklyPlans);

// Completion tracking
router.put("/:id/complete", completeWorkout);

// Update & Delete
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
