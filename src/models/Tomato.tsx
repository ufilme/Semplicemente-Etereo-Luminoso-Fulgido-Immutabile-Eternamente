import mongoose from "mongoose";

const Tomato = new mongoose.Schema(
  {
    userid: mongoose.Types.ObjectId,
    tomatoes: [{
      tStudio: Number,
      tPausa: Number,
      nCicli: Number
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Tomato || mongoose.model("Tomato", Tomato);