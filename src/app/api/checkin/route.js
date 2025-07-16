
// import { NextResponse } from "next/server";
// import dbConnection from "@/config/dbConnection";
// import Checkin from "@/models/checkinModel";

// // POST: Create new check-in
// export async function POST(req) {
//   console.log("📥 Received a POST request to /api/checkin");

//   await dbConnection();

//   try {
//     const { name, date, time, location, status } = await req.json();

//     // Validation
//     if (!name || !date || !time || !location) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Save to DB
//     const newCheckin = await Checkin.create({
//       name,
//       date,
//       time,
//       location,
//       status,
//     });

//     console.log("✅ Check-in saved:", newCheckin);

//     return NextResponse.json(
//       { message: "Check-in successful", checkin: newCheckin },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("❌ Error in check-in POST:", error.message);
//     return NextResponse.json(
//       { message: "Server error while saving check-in" },
//       { status: 500 }
//     );
//   }
// }

// // GET: Fetch all check-ins
// export async function GET() {
//   console.log("📤 Received a GET request to /api/checkin");

//   await dbConnection();

//   try {
//     const checkins = await Checkin.find().sort({ createdAt: -1 });
//     return NextResponse.json(checkins, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error fetching check-ins:", error.message);
//     return NextResponse.json(
//       { message: "Failed to fetch check-ins" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import Checkin from "@/models/checkinModel";
import { getToken } from "next-auth/jwt"; // Adjust this if you're using another auth method

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
  await dbConnection();

  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { email, role } = token;

    const checkins =
      role === "admin"
        ? await Checkin.find().sort({ createdAt: -1 })
        : await Checkin.find({ userEmail: email }).sort({ createdAt: -1 });

    return NextResponse.json(checkins);
  } catch (error) {
    console.error("GET /api/checkin error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnection();

  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, date, time, location, status } = await req.json();

    if (!name || !date || !time || !location) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCheckin = await Checkin.create({
      name,
      date,
      time,
      location,
      status,
      userEmail: token.email,
    });

    return NextResponse.json(
      { message: "Check-in successful", checkin: newCheckin },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/checkin error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
