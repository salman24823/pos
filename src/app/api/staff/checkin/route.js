// GET only current user's records
import { NextResponse } from "next/server";
// import dbConnection from "@/config/dbConnection";
import checkinModel from "@/models/checkinModel";
import dbConnection from "@/config/dbConnection";
export async function GET(req) {
  try {
    await dbConnection();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const records = await checkinModel.find({ email }).sort({ createdAt: -1 });
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching records", error },
      { status: 500 }
    );
  }
}
