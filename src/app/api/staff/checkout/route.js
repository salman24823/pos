import { NextResponse } from "next/server";
import dbConnection from "@/config/db";
import CheckinModel from "@/models/checkinModel";

export async function GET(req) {
  try {
    await dbConnection();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ message: "Email required" }, { status: 400 });
    }

    const records = await checkinModel.find({
      email,
      status: "Checked-Out",
    }).sort({ createdAt: -1 });
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching records", error },
      { status: 500 }
    );
  }
}
