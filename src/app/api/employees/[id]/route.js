import { NextResponse } from 'next/server';
import dbConnection from '@/config/dbConnection';
import User from '@/models/userModel';

export async function GET(_, { params }) {
  await dbConnection();
  const user = await User.findById(params.id);
  if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 });
  return NextResponse.json(user);
}
