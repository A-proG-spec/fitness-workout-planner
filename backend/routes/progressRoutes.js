import express from "express";
import {
  addProgress,
  getProgress,
  getProgressStats,
} from "../controllers/progressController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// Add progress
router.post("/", addProgress);

// Get progress
router.get("/", getProgress);

// Get progress statistics
router.get("/stats", getProgressStats);

export default router;