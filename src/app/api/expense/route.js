

// // Add this to generate a mock ID
// import { nanoid } from 'nanoid'; // install nanoid

// let mockDB = [];

// export async function POST(req) {
//   const body = await req.json();
//   const newExpense = {
//     _id: nanoid(),
//     item: body.item,
//     amount: body.amount,
//     date: body.date,
//   };
//   mockDB.unshift(newExpense);
//   return Response.json({ success: true, expense: newExpense });
// }

// export async function DELETE(req) {
//   const { _id } = await req.json();
//   mockDB = mockDB.filter(exp => exp._id !== _id);
//   return Response.json({ success: true });
// }


// pages/api/expense/index.js
import db from './cofig/dbConnect'; // adjust if needed
import Expense from '@/models/Expense';   // your mongoose model

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const expenses = await Expense.find().sort({ createdAt: -1 });

      // Calculate total
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

      res.status(200).json({ expenses, total });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch expenses.' });
    }
  }

  // handle other methods like POST/DELETE...
}
