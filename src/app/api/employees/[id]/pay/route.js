import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import { connectDB } from '@/lib/db';

export async function PATCH(req, { params }) {
  await connectDB();

  const { newPay } = await req.json();
  const user = await User.findById(params.id);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  user.payHistory = user.payHistory || [];

  user.payHistory.push({
    amount: newPay,
    date: new Date().toISOString(),
  });

  await user.save();

  return NextResponse.json({ message: 'Pay updated', payHistory: user.payHistory });
}
