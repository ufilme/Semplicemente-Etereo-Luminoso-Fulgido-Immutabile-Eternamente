import mongoose from "mongoose";

const Event = new mongoose.Schema(
  {
    userid: mongoose.Types.ObjectId,
    events: [{
      title: String,
      start: Date,
      end: Date,
      allDay: Boolean,
      location: String,
      id: String,
      repetitionEvery: Number,
      repetitionCount: Number,
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Event || mongoose.model("Event", Event);