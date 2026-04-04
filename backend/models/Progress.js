import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    Progress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Progress',
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

// Ensure one entry per Progress per day
ProgressSchema.index({ Progress: 1, date: 1 }, { unique: true });

const Progress = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
export default Progress;