import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a workout name'],
        trim: true
    },
    type: {
        type: String,
        enum: ['Cardio', 'Strength', 'Flexibility', 'HIIT', 'Yoga'],
        required: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    instructions: {
        type: String,
        required: [true, 'Please add instructions']
    },
    equipments: [{
        type: String
    }],
    duration: {
        type: Number,
        required: [true, 'Please add duration in minutes']
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    tags: [{
        type: String
    }],
    caloriesBurnEstimate: {
        type: Number,
        comment: 'Estimated calories burned per session'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', WorkoutSchema);