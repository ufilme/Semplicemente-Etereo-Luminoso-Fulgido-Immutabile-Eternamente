import mongoose from "mongoose";

const Note = new mongoose.Schema(
  {
    userid: mongoose.Types.ObjectId,
    notes: [{
      id: String,
      title: String,
      body: String,
      category: String,
      date_edit: Date,
      date_create: Date
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Note || mongoose.model("Note", Note);