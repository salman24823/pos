import { NextResponse } from 'next/server';
import Attendance from '@/models/attendanceModel';
import { connectDB } from '@/lib/db';

export async function GET(_, { params }) {
  await connectDB();

  const userId = params.id;
  const user = await import('@/models/userModel').then(m => m.default.findById(userId));
  if (!user) return NextResponse.json([], { status: 200 });

  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const records = await Attendance.find({
    name: user.fullname || user.name,
    createdAt: { $gte: weekAgo },
  }).sort({ createdAt: -1 });

  return NextResponse.json(records);
}
