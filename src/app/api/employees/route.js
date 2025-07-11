
import { connectDB } from '@/lib/db';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const employees = await User.find({ isTerminate: false });
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching employees" }, { status: 500 });
  }
}

