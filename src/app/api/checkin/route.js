import { connectDB } from '@/lib/db';
import Checkin from '@/models/checkinModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const { name, date, time, location, status } = body;

  if (!name || !date || !time || !location) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newCheckin = await Checkin.create({ name, date, time, location, status });
  return NextResponse.json({ message: 'Check-in successful', checkin: newCheckin }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const checkins = await Checkin.find().sort({ createdAt: -1 });
  return NextResponse.json(checkins, { status: 200 });
}

