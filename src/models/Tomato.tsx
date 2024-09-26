import mongoose from "mongoose";

const Tomato = new mongoose.Schema(
  {
    userid: mongoose.Types.ObjectId,
    tomatoes: [{
      tStudio: Number,
      tPausa: Number,
      nCicli: Number,
      title: String,
      start: Date,
      end: Date,
      id: String,
      completed: Boolean,
      notifyState: Number
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tomato || mongoose.model("Tomato", Tomato);