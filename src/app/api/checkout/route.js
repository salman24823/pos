import { NextResponse } from 'next/server';
import dbConnection from '@/config/dbConnection';
import Checkout from '@/models/checkoutModel';
import { connectDB } from '@/lib/db';

export async function POST(req) {
  await dbConnection();
  const body = await req.json();

  const { name, date, time, location, status } = body;

  if (!name || !date || !time || !location) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  const newCheckout = await Checkout.create({ name, date, time, location, status });
  return NextResponse.json({ message: 'Check-out successful', checkout: newCheckout }, { status: 201 });
}

export async function GET() {
  await dbConnection();
  const checkouts = await Checkout.find().sort({ createdAt: -1 });
  return NextResponse.json(checkouts, { status: 200 });
}
