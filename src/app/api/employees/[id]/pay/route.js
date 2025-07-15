

import { NextResponse } from "next/server";
import connectDB from "@/config/dbConnection"; // ✅ Import your MongoDB connection function
import User from "@/models/userModel";

export async function PATCH(req, { params }) {
  await connectDB(); // ✅ Ensure DB is connected

  try {
    const { newPay } = await req.json();

    const user = await User.findById(params.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.payHistory = user.payHistory || [];

    user.payHistory.push({
      amount: newPay,
      date: new Date().toISOString(),
    });

    await user.save();

    return NextResponse.json({
      message: "Pay updated",
      payHistory: user.payHistory,
    });
  } catch (error) {
    console.error("PATCH /api/employees/:id/pay error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
