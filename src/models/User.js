import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  phone: String,
  profilePic: String,
  role: { type: String, enum: ["admin", "manager", "staff"], default: "staff" },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
