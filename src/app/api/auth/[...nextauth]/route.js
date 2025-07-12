import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/userModel';

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
    },
  });
}
