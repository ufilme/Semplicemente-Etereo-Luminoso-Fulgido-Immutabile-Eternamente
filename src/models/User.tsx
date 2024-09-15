import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    username: String,
    password: String
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", User);