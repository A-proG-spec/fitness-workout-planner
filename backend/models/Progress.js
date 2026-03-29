import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    weight: {
        type: Number,
        comment: 'Weight in kg'
    },
    caloriesBurned: {
        type: Number,
        comment: 'Total calories burned for the day'
    },
    notes: {
        type: String
    },
    measurements: {
        chest: Number,
        waist: Number,
        hips: Number,
        arms: Number
    }
}, {
    timestamps: true
});

// Ensure one entry per user per day
ProgressSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);