const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },

  // exercise categories
  exercises: [
    {
      type: {
        type: String,
        trim: true,
      },

      name: {
        type: String,
        trim: true,
      },

      duration: Number,
      weight: {
        type: Number,
        default: 0,
      },

      reps: {
        type: Number,
        default: 0,
      },

      sets: {
        type: Number,
        default: 0,
      },

      distance: {
        type: Number,
        default: 0,
      },
    },
  ],
  // total duration of exercise
  totalDuration: {
    type: Number,
    default: 0,
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

// Most of this are coming from mini projects -- week 17
