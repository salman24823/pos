import db from './config/dbConnect';

import Checkin from '@/models/checkinModel';

export async function POST(req) {
  await dbConnection();
  const body = await req.json();

  const { name, date, time, location, status } = body;

  if (!name || !date || !time || !location) {
    return Response.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newCheckin = await Checkin.create({ name, date, time, location, status });
  return Response.json({ message: 'Check-in successful', checkin: newCheckin }, { status: 201 });
}

export async function GET() {
  await dbConnection();
  const checkins = await Checkin.find().sort({ createdAt: -1 });
  return Response.json(checkins, { status: 200 });
}
