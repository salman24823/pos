


'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

export default function ExpensePage() {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!item || !amount) {
      setNotification({ type: 'error', message: 'Please fill all fields' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const newExpense = {
      item,
      amount: parseFloat(amount),
      date: new Date().toLocaleString(),
    };

    try {
      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExpense),
      });

      const data = await res.json();

      if (res.ok) {
        setExpenses([data.expense, ...expenses]);
        setItem('');
        setAmount('');
        setNotification({ type: 'success', message: 'Expense added successfully' });
        setTimeout(() => setNotification(null), 3000);
      } else {
        throw new Error(data.message || 'Failed to save expense');
      }
    } catch (error) {
      setNotification({ type: 'error', message: error.message });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // ✅ Fix: Directly remove from local state (or call proper backend with ID)
  const handleDeleteExpense = (index) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) return;

    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);

    setNotification({ type: 'success', message: 'Expense deleted successfully' });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchExpenses = async () => {
    try {
      const res = await fetch('/api/expense');
      const data = await res.json();
      setExpenses(data.expenses || []);
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to fetch expenses' });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-200 p-8 font-sans">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg text-white ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-5xl mx-auto bg-white/30 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20"
      >
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-tight flex items-center justify-center">
          <motion.span
            className="mr-3"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
          >
            💸
          </motion.span>
          Expense Tracker
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl p-6 mb-8 shadow-lg text-center"
        >
          <h2 className="text-2xl font-semibold">Total Expenses</h2>
          <p className="text-4xl font-bold mt-2">${totalExpenses}</p>
        </motion.div>

        <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Expense Item</label>
            <input
              type="text"
              placeholder="e.g. Netflix, Grocery"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white/50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
              aria-label="Expense Item"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Amount ($)</label>
            <input
              type="number"
              placeholder="e.g. 199.99"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-white/50 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
              aria-label="Amount"
            />
          </motion.div>

          <motion.div className="flex items-end" whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center"
              aria-label="Add Expense"
            >
              <span className="mr-2">➕</span> Add Expense
            </button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-inner"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">📊</span> Expense History
          </h2>

          {expenses.length === 0 ? (
            <p className="text-gray-600 text-center text-lg">No expenses added yet.</p>
          ) : (
            <ul className="space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 pr-2">
              <AnimatePresence>
                {expenses.map((exp, i) => (
                  <motion.li
                    key={exp._id || i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl p-5 flex justify-between items-center shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{exp.item}</p>
                      <p className="text-sm text-gray-600">{exp.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-gray-800">${exp.amount.toFixed(2)}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteExpense(i)}
                        className="text-red-500 hover:text-red-600 transition-all duration-200"
                        aria-label={`Delete ${exp.item} expense`}
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
