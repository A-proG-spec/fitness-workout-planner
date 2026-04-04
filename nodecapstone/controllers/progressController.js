import Progress from "../models/progress.js";
import Plan from "../models/Plan.js";

// Add progress
export const addProgress = async (req, res, next) => {
  try {
    const { weight, caloriesBurned, notes } = req.body;

    const progress = await Progress.create({
      user: req.user._id,
      weight,
      caloriesBurned,
      notes,
    });

    res.status(201).json({
      success: true,
      data: progress,
    });
  } catch (err) {
    next(err);
  }
};

// Get progress history
export const getProgress = async (req, res, next) => {
  try {
    const progress = await Progress.find({
      user: req.user._id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: progress.length,
      data: progress,
    });
  } catch (err) {
    next(err);
  }
};

// Get progress statistics
export const getProgressStats = async (req, res, next) => {
  try {
    const progress = await Progress.find({
      user: req.user._id,
    }).sort({ date: 1 });

    const weightTrend = progress.map((item) => ({
      date: item.date,
      weight: item.weight,
    }));

    const caloriesTrend = progress.map((item) => ({
      date: item.date,
      calories: item.caloriesBurned,
    }));

    const completedWorkouts = await Plan.countDocuments({
      user: req.user._id,
      completed: true,
    });

    res.status(200).json({
      success: true,
      data: {
        weightTrend,
        caloriesTrend,
        completedWorkouts,
      },
    });
  } catch (err) {
    next(err);
  }
};
