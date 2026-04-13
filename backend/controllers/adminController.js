import User from '../models/User.js';
import Exercise from '../models/Exercise.js';
import Plan from '../models/Plan.js';
// import Progress from '../models/Progress.js';

// ==================== USER MANAGEMENT ====================

/**
 * @desc    Get all users (admin only)
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, role, search } = req.query;
        
        const filter = {};
        if (role) filter.role = role;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        const [users, total] = await Promise.all([
            User.find(filter)
                .select('-password')
                .skip(skip)
                .limit(limitNum)
                .sort({ createdAt: -1 }),
            User.countDocuments(filter)
        ]);
        
        res.status(200).json({
            success: true,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
            count: users.length,
            data: { users }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get single user by ID (admin only)
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        
        // Get user statistics
        const [totalPlans, completedPlans, progressEntries] = await Promise.all([
            Plan.countDocuments({ user: user._id }),
            Plan.countDocuments({ user: user._id, completed: true }),
            Progress.countDocuments({ user: user._id })
        ]);
        
        res.status(200).json({
            success: true,
            data: {
                user,
                stats: {
                    totalPlans,
                    completedPlans,
                    completionRate: totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0,
                    progressEntries
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Update user role (make admin/user)
 * @route   PUT /api/admin/users/:id/role
 * @access  Private/Admin
 */
export const updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        
        if (!role || !['user', 'admin'].includes(role)) {
            const error = new Error('Valid role (user or admin) is required');
            error.statusCode = 400;
            throw error;
        }
        
        // Prevent admin from changing their own role
        if (req.params.id === req.user._id.toString()) {
            const error = new Error('You cannot change your own role');
            error.statusCode = 400;
            throw error;
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true, runValidators: true }
        ).select('-password');
        
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({
            success: true,
            message: `User role updated to ${role}`,
            data: { user }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Delete user (admin only)
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req, res, next) => {
    try {
        // Prevent admin from deleting themselves
        if (req.params.id === req.user._id.toString()) {
            const error = new Error('You cannot delete your own account');
            error.statusCode = 400;
            throw error;
        }
        
        const user = await User.findById(req.params.id);
        
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        
        // Delete all user data
        await Promise.all([
            User.findByIdAndDelete(req.params.id),
            Plan.deleteMany({ user: req.params.id }),
            Progress.deleteMany({ user: req.params.id })
        ]);
        
        res.status(200).json({
            success: true,
            message: 'User and all associated data deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Deactivate user (soft delete)
 * @route   PUT /api/admin/users/:id/deactivate
 * @access  Private/Admin
 */
export const deactivateUser = async (req, res, next) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            const error = new Error('You cannot deactivate your own account');
            error.statusCode = 400;
            throw error;
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        ).select('-password');
        
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({
            success: true,
            message: 'User deactivated successfully',
            data: { user }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Activate user
 * @route   PUT /api/admin/users/:id/activate
 * @access  Private/Admin
 */
export const activateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive: true },
            { new: true }
        ).select('-password');
        
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({
            success: true,
            message: 'User activated successfully',
            data: { user }
        });
    } catch (err) {
        next(err);
    }
};

// ==================== EXERCISE MANAGEMENT (Admin) ====================

/**
 * @desc    Create exercise (admin only)
 * @route   POST /api/admin/exercises
 * @access  Private/Admin
 */
export const createExercise = async (req, res, next) => {
    try {
        const exerciseData = {
            ...req.body,
            createdBy: req.user._id
        };
        
        const exercise = await Exercise.create(exerciseData);
        
        res.status(201).json({
            success: true,
            message: 'Exercise created successfully',
            data: { exercise }
        });
    } catch (err) {
        if (err.code === 11000) {
            const error = new Error('Exercise with this name already exists');
            error.statusCode = 400;
            return next(error);
        }
        next(err);
    }
};

/**
 * @desc    Update exercise (admin only)
 * @route   PUT /api/admin/exercises/:id
 * @access  Private/Admin
 */
export const updateExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!exercise) {
            const error = new Error('Exercise not found');
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({
            success: true,
            message: 'Exercise updated successfully',
            data: { exercise }
        });
    } catch (err) {
        if (err.code === 11000) {
            const error = new Error('Exercise with this name already exists');
            error.statusCode = 400;
            return next(error);
        }
        next(err);
    }
};

/**
 * @desc    Delete exercise (hard delete - admin only)
 * @route   DELETE /api/admin/exercises/:id
 * @access  Private/Admin
 */
export const deleteExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByIdAndDelete(req.params.id);
        
        if (!exercise) {
            const error = new Error('Exercise not found');
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({
            success: true,
            message: 'Exercise deleted permanently'
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Get all exercises (admin view with inactive)
 * @route   GET /api/admin/exercises
 * @access  Private/Admin
 */
export const getAllExercisesAdmin = async (req, res, next) => {
    try {
        const { muscleGroup, difficulty, equipment, isActive, page = 1, limit = 20 } = req.query;
        
        const filter = {};
        if (muscleGroup) filter.muscleGroup = muscleGroup;
        if (difficulty) filter.difficulty = difficulty;
        if (equipment) filter.equipment = equipment;
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        const [exercises, total] = await Promise.all([
            Exercise.find(filter)
                .skip(skip)
                .limit(limitNum)
                .sort({ createdAt: -1 }),
            Exercise.countDocuments(filter)
        ]);
        
        res.status(200).json({
            success: true,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
            count: exercises.length,
            data: { exercises }
        });
    } catch (err) {
        next(err);
    }
};

/**
 * @desc    Toggle exercise active status (soft delete/restore)
 * @route   PUT /api/admin/exercises/:id/toggle-status
 * @access  Private/Admin
 */
export const toggleExerciseStatus = async (req, res, next) => {
    try {
        const exercise = await Exercise.findById(req.params.id);
        
        if (!exercise) {
            const error = new Error('Exercise not found');
            error.statusCode = 404;
            throw error;
        }
        
        exercise.isActive = !exercise.isActive;
        await exercise.save();
        
        res.status(200).json({
            success: true,
            message: `Exercise ${exercise.isActive ? 'activated' : 'deactivated'}`,
            data: { exercise }
        });
    } catch (err) {
        next(err);
    }
};

// ==================== DASHBOARD STATISTICS ====================

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
export const getDashboardStats = async (req, res, next) => {
    try {
        const [
            totalUsers,
            activeUsers,
            totalExercises,
            activeExercises,
            totalPlans,
            completedPlans,
            totalProgress
        ] = await Promise.all([
            User.countDocuments(),
            User.countDocuments({ isActive: true }),
            Exercise.countDocuments(),
            Exercise.countDocuments({ isActive: true }),
            Plan.countDocuments(),
            Plan.countDocuments({ completed: true }),
            Progress.countDocuments()
        ]);
        
        // Get recent users
        const recentUsers = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);
        
        // Get recent plans
        const recentPlans = await Plan.find()
            .populate('user', 'name email')
            .populate('workout', 'name')
            .sort({ createdAt: -1 })
            .limit(5);
        
        res.status(200).json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    active: activeUsers,
                    inactive: totalUsers - activeUsers
                },
                exercises: {
                    total: totalExercises,
                    active: activeExercises,
                    inactive: totalExercises - activeExercises
                },
                plans: {
                    total: totalPlans,
                    completed: completedPlans,
                    completionRate: totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0
                },
                progress: {
                    totalEntries: totalProgress
                },
                recentUsers,
                recentPlans
            }
        });
    } catch (err) {
        next(err);
    }
};