// /models/Expense.js
import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  item: String,
  amount: Number,
  date: String,
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
