import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    username: String,
    password: String,
    notifications: String,
    nomeVero: String,
    nomeFalso: String,
    cognome: String,
    selfie: Boolean
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", User);