// import { NextResponse } from 'next/server';
// import dbConnection from '@/config/dbConnection';
// import Checkout from '@/models/checkoutModel';
// // import { connectDB } from '@/lib/db';

// export async function POST(req) {
//   await dbConnection();
//   const body = await req.json();

//   const { name, date, time, location, status } = body;

//   if (!name || !date || !time || !location) {
//     return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
//   }

//   const newCheckout = await Checkout.create({ name, date, time, location, status });
//   return NextResponse.json({ message: 'Check-out successful', checkout: newCheckout }, { status: 201 });
// }

// export async function GET() {
//   await dbConnection();
//   const checkouts = await Checkout.find().sort({ createdAt: -1 });
//   return NextResponse.json(checkouts, { status: 200 });
// }


import { NextResponse } from "next/server";
import dbConnection from "@/config/dbConnection";
import Checkout from "@/models/checkoutModel";

// POST: Create a new checkout record
export async function POST(req) {
  console.log("📥 Received a POST request to /api/checkout");

  await dbConnection();

  try {
    const { name, date, time, location, status } = await req.json();

    // Validate required fields
    if (!name || !date || !time || !location) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save the new checkout
    const newCheckout = await Checkout.create({
      name,
      date,
      time,
      location,
      status,
    });

    console.log("✅ Checkout saved:", newCheckout);

    return NextResponse.json(
      { message: "Check-out successful", checkout: newCheckout },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in checkout POST:", error.message);
    return NextResponse.json(
      { message: "Server error while saving checkout" },
      { status: 500 }
    );
  }
}

// GET: Fetch all checkout records
export async function GET() {
  console.log("📤 Received a GET request to /api/checkout");

  await dbConnection();

  try {
    const checkouts = await Checkout.find().sort({ createdAt: -1 });
    return NextResponse.json(checkouts, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching checkouts:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch checkouts" },
      { status: 500 }
    );
  }
}
