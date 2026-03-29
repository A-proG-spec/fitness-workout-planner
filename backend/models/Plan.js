import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: true
    },
    scheduledDate: {
        type: Date,
        required: [true, 'Please add a scheduled date']
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

PlanSchema.index({ user: 1, scheduledDate: 1 });
PlanSchema.index({ user: 1, completed: 1 });

export default mongoose.model('Plan', PlanSchema);