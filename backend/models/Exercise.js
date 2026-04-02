const mongoose = require('mongoose');

// This defines what ONE exercise document looks like in MongoDB
const ExerciseSchema = new mongoose.Schema(
  {
    // ─── Basic Info ───────────────────────────────────────────────────────────
    name: {
      type: String,
      required: [true, 'Exercise name is required'],
      trim: true,
      unique: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },

    // ─── Categorization (used for filtering) ─────────────────────────────────
    muscleGroup: {
      type: String,
      required: [true, 'Muscle group is required'],
      // These are the ONLY accepted values
      enum: {
        values: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'legs', 'glutes', 'abs', 'cardio', 'full_body'],
        message: '{VALUE} is not a valid muscle group',
      },
    },

    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
      enum: {
        values: ['beginner', 'intermediate', 'advanced'],
        message: '{VALUE} is not a valid difficulty level',
      },
    },

    equipment: {
      type: String,
      required: [true, 'Equipment is required'],
      enum: {
        values: ['none', 'dumbbells', 'barbell', 'machine', 'resistance_band', 'kettlebell', 'pull_up_bar', 'bench', 'cable'],
        message: '{VALUE} is not a valid equipment type',
      },
    },

    category: {
      type: String,
      enum: ['strength', 'cardio', 'flexibility', 'balance'],
      default: 'strength',
    },

    // ─── Exercise Details ─────────────────────────────────────────────────────
    instructions: {
      type: [String], // array of step-by-step instructions
      default: [],
    },

    tips: {
      type: [String], // coaching tips / common mistakes
      default: [],
    },

    // Default reps/sets recommendation
    defaultSets: {
      type: Number,
      default: 3,
      min: 1,
      max: 10,
    },

    defaultReps: {
      type: Number,
      default: 10,
      min: 1,
      max: 100,
    },

    defaultDurationSeconds: {
      type: Number, // for timed exercises (planks, cardio, etc.)
      default: null,
    },

    // Calories burned estimate per minute
    caloriesPerMinute: {
      type: Number,
      default: null,
    },

    // ─── Media ────────────────────────────────────────────────────────────────
    imageUrl: {
      type: String,
      default: null,
    },

    videoUrl: {
      type: String,
      default: null,
    },

    // ─── Admin control ───────────────────────────────────────────────────────
    isActive: {
      type: Boolean,
      default: true, // inactive exercises are hidden from users
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // references the User model from emnet's task
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// ─── Index for fast text search by name ──────────────────────────────────────
// This makes searching exercises by name very fast
ExerciseSchema.index({ name: 'text', description: 'text' });

// ─── Compound index for fast filtering ───────────────────────────────────────
ExerciseSchema.index({ muscleGroup: 1, difficulty: 1, equipment: 1 });

module.exports = mongoose.model('Exercise', ExerciseSchema);
