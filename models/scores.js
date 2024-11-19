import mongoose from "mongoose";

const scoresSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
);


const Scores = mongoose.model('Scores', scoresSchema);
export default Scores;
