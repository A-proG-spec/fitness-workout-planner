import express from 'express';
import { body } from 'express-validator';
import {
  getAllExercises,
  getExerciseById,
  getFilterOptions,
  getExercisesByMuscleGroup,
  createExercise,
  updateExercise,
  deleteExercise,
  getLibraryStats,
} from '../controllers/exerciseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const VALID_MUSCLE_GROUPS = ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'legs', 'glutes', 'abs', 'cardio', 'full_body'];
const VALID_DIFFICULTIES  = ['beginner', 'intermediate', 'advanced'];
const VALID_EQUIPMENT     = ['none', 'dumbbells', 'barbell', 'machine', 'resistance_band', 'kettlebell', 'pull_up_bar', 'bench', 'cable'];
const VALID_CATEGORIES    = ['strength', 'cardio', 'flexibility', 'balance'];

const exerciseValidation = [
  body('name').trim().notEmpty().withMessage('Exercise name is required').isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('muscleGroup').notEmpty().withMessage('Muscle group is required').isIn(VALID_MUSCLE_GROUPS).withMessage(`Must be one of: ${VALID_MUSCLE_GROUPS.join(', ')}`),
  body('difficulty').notEmpty().withMessage('Difficulty is required').isIn(VALID_DIFFICULTIES).withMessage('Must be: beginner, intermediate, or advanced'),
  body('equipment').notEmpty().withMessage('Equipment is required').isIn(VALID_EQUIPMENT).withMessage(`Must be one of: ${VALID_EQUIPMENT.join(', ')}`),
  body('category').optional().isIn(VALID_CATEGORIES).withMessage(`Must be one of: ${VALID_CATEGORIES.join(', ')}`),
  body('defaultSets').optional().isInt({ min: 1, max: 10 }).withMessage('Sets must be 1–10'),
  body('defaultReps').optional().isInt({ min: 1, max: 100 }).withMessage('Reps must be 1–100'),
];

// Public routes
router.get('/filter-options',  getFilterOptions);
router.get('/by-muscle-group', getExercisesByMuscleGroup);
router.get('/stats',           getLibraryStats);
router.get('/',                getAllExercises);
router.get('/:id',             getExerciseById);

// Protected routes
router.post('/',      protect, exerciseValidation, createExercise);
router.put('/:id',    protect, updateExercise);
router.delete('/:id', protect, deleteExercise);

export default router;