import { validationResult } from 'express-validator';
import Exercise from '../models/Exercise.js';

const getAllExercises = async (req, res) => {
  try {
    const {
      muscleGroup,
      difficulty,
      equipment,
      category,
      search,
      page = 1,
      limit = 10,
      sort = 'name',
    } = req.query;

    const filter = { isActive: true };

    if (muscleGroup) filter.muscleGroup = muscleGroup;
    if (difficulty)  filter.difficulty  = difficulty;
    if (equipment)   filter.equipment   = equipment;
    if (category)    filter.category    = category;

    if (search && search.trim()) {
      filter.$or = [
        { name:        { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const pageNum  = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)));
    const skip     = (pageNum - 1) * limitNum;

    const validSorts = ['name', 'difficulty', 'muscleGroup', 'createdAt'];
    const sortField  = validSorts.includes(sort) ? sort : 'name';
    const sortObj    = { [sortField]: 1 };

    const [exercises, total] = await Promise.all([
      Exercise.find(filter).sort(sortObj).skip(skip).limit(limitNum).select('-__v'),
      Exercise.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      count: exercises.length,
      exercises,
    });
  } catch (error) {
    console.error('GetAllExercises error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id).select('-__v');
    if (!exercise || !exercise.isActive) {
      return res.status(404).json({ success: false, message: 'Exercise not found.' });
    }
    res.status(200).json({ success: true, exercise });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid exercise ID format.' });
    }
    console.error('GetExerciseById error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    const [muscleGroups, difficulties, equipmentList, categories] = await Promise.all([
      Exercise.distinct('muscleGroup', { isActive: true }),
      Exercise.distinct('difficulty',  { isActive: true }),
      Exercise.distinct('equipment',   { isActive: true }),
      Exercise.distinct('category',    { isActive: true }),
    ]);

    res.status(200).json({
      success: true,
      filterOptions: {
        muscleGroups: muscleGroups.sort(),
        difficulties: ['beginner', 'intermediate', 'advanced'],
        equipment:    equipmentList.sort(),
        categories:   categories.sort(),
      },
    });
  } catch (error) {
    console.error('GetFilterOptions error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getExercisesByMuscleGroup = async (req, res) => {
  try {
    const exercises = await Exercise.find({ isActive: true })
      .sort({ muscleGroup: 1, name: 1 })
      .select('name muscleGroup difficulty equipment defaultSets defaultReps description');

    const grouped = exercises.reduce((acc, exercise) => {
      const group = exercise.muscleGroup;
      if (!acc[group]) acc[group] = [];
      acc[group].push(exercise);
      return acc;
    }, {});

    res.status(200).json({ success: true, totalExercises: exercises.length, grouped });
  } catch (error) {
    console.error('GetExercisesByMuscleGroup error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const createExercise = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const exerciseData = { ...req.body, createdBy: req.user._id };
    const exercise = await Exercise.create(exerciseData);

    res.status(201).json({ success: true, message: 'Exercise created successfully!', exercise });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'An exercise with this name already exists.' });
    }
    console.error('CreateExercise error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const updateExercise = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!exercise) {
      return res.status(404).json({ success: false, message: 'Exercise not found.' });
    }

    res.status(200).json({ success: true, message: 'Exercise updated!', exercise });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid exercise ID.' });
    }
    console.error('UpdateExercise error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!exercise) {
      return res.status(404).json({ success: false, message: 'Exercise not found.' });
    }

    res.status(200).json({ success: true, message: 'Exercise removed from library.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid exercise ID.' });
    }
    console.error('DeleteExercise error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

const getLibraryStats = async (req, res) => {
  try {
    const [byMuscle, byDifficulty, byEquipment, total] = await Promise.all([
      Exercise.aggregate([{ $match: { isActive: true } }, { $group: { _id: '$muscleGroup', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Exercise.aggregate([{ $match: { isActive: true } }, { $group: { _id: '$difficulty',  count: { $sum: 1 } } }]),
      Exercise.aggregate([{ $match: { isActive: true } }, { $group: { _id: '$equipment',   count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      Exercise.countDocuments({ isActive: true }),
    ]);

    res.status(200).json({
      success: true,
      stats: { total, byMuscleGroup: byMuscle, byDifficulty, byEquipment },
    });
  } catch (error) {
    console.error('GetLibraryStats error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export {
  getAllExercises,
  getExerciseById,
  getFilterOptions,
  getExercisesByMuscleGroup,
  createExercise,
  updateExercise,
  deleteExercise,
  getLibraryStats,
};