import Plan from "../models/Plan.js";

// Mark workout as completed
export const completeWorkout = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      const error = new Error("Plan not found");
      error.statusCode = 404;
      throw error;
    }

    // Check ownership
    if (plan.user.toString() !== req.user._id.toString()) {
      const error = new Error("Not authorized");
      error.statusCode = 401;
      throw error;
    }

    plan.completed = true;
    plan.completedAt = new Date();

    await plan.save();

    res.status(200).json({
      success: true,
      message: "Workout completed successfully",
      data: plan,
    });
  } catch (err) {
    next(err);
  }
};

// Get completion statistics
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
