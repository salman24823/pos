import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import User from "@/models/userModel";

export async function GET(req, { params }) {
  await dbConnection();
  const user = await User.findOne({ email: params.email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    attendance: user.attendance || [],
    payHistory: user.payHistory || [],
  });
}
