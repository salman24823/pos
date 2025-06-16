import { NextResponse } from "next/server";
import dbConnection from "@/app/config/db";
import mongoose from "mongoose";

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

console.log("📩 Received a POST request to /api/register");

// POST endpoint for registration
export async function POST(req) {
  await dbConnection();

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

    // Save user
    const newUser = await User.create({ name, email, password });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
