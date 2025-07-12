// src/app/api/expense/route.js
import { NextResponse } from 'next/server';
import Expense from '@/models/expenses';
import { connectDB } from '@/lib/db';

// GET /api/expense
export async function GET() {
  await connectDB();
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    return NextResponse.json({ expenses, total });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch expenses.' }, { status: 500 });
  }
}

// POST /api/expense
export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const newExpense = new Expense(body);
    await newExpense.save();
    return NextResponse.json({ expense: newExpense, message: 'Expense created successfully.' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create expense.' }, { status: 500 });
  }
}
