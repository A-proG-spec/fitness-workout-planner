import express from 'express';
import {
    createPlan,
    getPlans,
    getDailyPlans,
    getWeeklyPlans,
    completeWorkout,
    deletePlan,
    updatePlan
} from '../controllers/planController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Plan routes
router.post('/plan', createPlan);
router.get('/plans', getPlans);
router.get('/plans/daily', getDailyPlans);
router.get('/plans/weekly', getWeeklyPlans);
router.put('/plan/:id/complete', completeWorkout);
router.put('/plan/:id', updatePlan);
router.delete('/plan/:id', deletePlan);

export default router;