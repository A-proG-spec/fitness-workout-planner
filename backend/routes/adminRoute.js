import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';
import {
    // User Management
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
    deactivateUser,
    activateUser,
    // Exercise Management
    createExercise,
    updateExercise,
    deleteExercise,
    getAllExercisesAdmin,
    toggleExerciseStatus,
    // Dashboard
    getDashboardStats
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(adminOnly);

// ==================== DASHBOARD ====================
router.get('/stats', getDashboardStats);

// ==================== USER MANAGEMENT ====================
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/deactivate', deactivateUser);
router.put('/users/:id/activate', activateUser);
router.delete('/users/:id', deleteUser);

// ==================== EXERCISE MANAGEMENT ====================
router.get('/exercises', getAllExercisesAdmin);
router.post('/exercises', createExercise);
router.put('/exercises/:id', updateExercise);
router.delete('/exercises/:id', deleteExercise);
router.put('/exercises/:id/toggle-status', toggleExerciseStatus);

export default router;