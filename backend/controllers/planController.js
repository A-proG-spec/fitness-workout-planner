import Plan from '../models/Plan.js';
import Workout from '../models/Workout.js';

// @desc    Create a workout plan
// @route   POST /api/workouts/plan
// @access  Private
export const createPlan = async (req, res, next) => {
    try {
        const { workoutId, scheduledDate, notes } = req.body;

        // Validate required fields
        if (!workoutId || !scheduledDate) {
            const error = new Error('Workout ID and scheduled date are required');
            error.statusCode = 400;
            throw error;
        }

        // Check if workout exists
        const workout = await Workout.findById(workoutId);
        if (!workout) {
            const error = new Error('Workout not found');
            error.statusCode = 404;
            throw error;
        }

        // Create plan
        const plan = await Plan.create({
            user: req.user._id,
            workout: workoutId,
            scheduledDate: new Date(scheduledDate),
            notes
        });

        // Populate workout details for response
        await plan.populate('workout', 'name type duration difficulty');

        res.status(201).json({
            success: true,
            data: plan
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all plans for logged in user
// @route   GET /api/workouts/plans
// @access  Private
export const getPlans = async (req, res, next) => {
    try {
        const plans = await Plan.find({ user: req.user._id })
            .populate('workout', 'name type description duration difficulty caloriesBurnEstimate')
            .sort({ scheduledDate: 1 });

        res.status(200).json({
            success: true,
            count: plans.length,
            data: plans
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get daily plans for a specific date
// @route   GET /api/workouts/plans/daily?date=YYYY-MM-DD
// @access  Private
export const getDailyPlans = async (req, res, next) => {
    try {
        const { date } = req.query;

        if (!date) {
            const error = new Error('Please provide a date');
            error.statusCode = 400;
            throw error;
        }

        // Create date range for the entire day
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const plans = await Plan.find({
            user: req.user._id,
            scheduledDate: { $gte: startDate, $lte: endDate }
        }).populate('workout', 'name type description duration difficulty');

        res.status(200).json({
            success: true,
            date,
            count: plans.length,
            data: plans
        });
    } catch (err) {
        next(err);
    }
};

export const getWeeklyPlans = async (req, res, next) => {
    try {
        let { startDate } = req.query;
        
        // If no start date provided, use current date
        if (!startDate) {
            startDate = new Date();
        } else {
            startDate = new Date(startDate);
        }
        
        // Set to start of day
        startDate.setHours(0, 0, 0, 0);
        
        // Calculate end date (7 days later)
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);
        endDate.setHours(23, 59, 59, 999);

        const plans = await Plan.find({
            user: req.user._id,
            scheduledDate: { $gte: startDate, $lte: endDate }
        })
        .populate('workout', 'name type duration difficulty')
        .sort({ scheduledDate: 1 });

        // Group plans by date
        const groupedByDate = {};
        plans.forEach(plan => {
            const dateKey = plan.scheduledDate.toISOString().split('T')[0];
            if (!groupedByDate[dateKey]) {
                groupedByDate[dateKey] = [];
            }
            groupedByDate[dateKey].push(plan);
        });

        res.status(200).json({
            success: true,
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            data: groupedByDate
        });
    } catch (err) {
        next(err);
    }
};


export const completeWorkout = async (req, res, next) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            const error = new Error('Plan not found');
            error.statusCode = 404;
            throw error;
        }

        // Check if plan belongs to user
        if (plan.user.toString() !== req.user._id.toString()) {
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }

        plan.completed = true;
        plan.completedAt = Date.now();
        await plan.save();

        res.status(200).json({
            success: true,
            message: 'Workout marked as completed',
            data: plan
        });
    } catch (err) {
        next(err);
    }
};
export const getCompletionStats = async (req, res, next) => {
  try {
    const totalPlans = await Plan.countDocuments({
      user: req.user._id,
    });

    const completedPlans = await Plan.countDocuments({
      user: req.user._id,
      completed: true,
    });

    const completionRate =
      totalPlans > 0 ? Math.round((completedPlans / totalPlans) * 100) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalPlans,
        completedPlans,
        completionRate,
      },
    });
  } catch (err) {
    next(err);
  }
};


export const updatePlan = async (req, res, next) => {
    try {
        const { scheduledDate, notes } = req.body;
        
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            const error = new Error('Plan not found');
            error.statusCode = 404;
            throw error;
        }

        // Check if plan belongs to user
        if (plan.user.toString() !== req.user._id.toString()) {
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }

        if (scheduledDate) {
            plan.scheduledDate = new Date(scheduledDate);
        }
        if (notes !== undefined) {
            plan.notes = notes;
        }

        await plan.save();
        await plan.populate('workout', 'name type duration');

        res.status(200).json({
            success: true,
            data: plan
        });
    } catch (err) {
        next(err);
    }
};


export const deletePlan = async (req, res, next) => {
    try {
        const plan = await Plan.findById(req.params.id);

        if (!plan) {
            const error = new Error('Plan not found');
            error.statusCode = 404;
            throw error;
        }

        // Check if plan belongs to user
        if (plan.user.toString() !== req.user._id.toString()) {
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }

        await plan.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Plan deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};