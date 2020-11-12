const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: true
            },
            name: {
                type: String,
                trim: true,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            weight: { type: Number },
            reps: { type: Number },
            sets: { type: Number },
            distance: { type: Number }
        }
    ]
}, {
    toJSON: {
        virtuals: true
    }
});

// Virtuals make itterating over the DB easier, despites sounding harder at first
// iterates over exercises and adds duration to a total duration then returns it.
WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((totalDuration, exercise) => {
        return totalDuration + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
