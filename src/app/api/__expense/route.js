

import dbConnection from '@/config/db';
// import Expense from '@/models/Expense';   // your mongoose model

export default async function handler(req, res) {
  await dbConnection();

  if (req.method === 'GET') {
    try {
      // const expenses = await Expense.find().sort({ createdAt: -1 });

      // Calculate total
      // const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

      res.status(200).json({ expenses, total });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch expenses.' });
    }
  }

  // handle other methods like POST/DELETE...
}
