import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    weight: Number,
    caloriesBurned: Number,
    notes: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Progress", ProgressSchema);
