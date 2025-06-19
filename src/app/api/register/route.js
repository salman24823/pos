import { NextResponse } from "next/server";
import dbConnection from "@/config/db";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';


// Create a schema/model
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);


// POST endpoint for registration
export async function POST(req) {

  console.log("📩 Received a POST request to /api/register");

  try {
    await dbConnection();
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    return NextResponse.json({ message: "Database connection failed" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Simple validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
