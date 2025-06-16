'use client';
import { useState } from 'react';

export default function CheckOutPage() {
  const [form, setForm] = useState({ employeeId: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Check-out successful!');
      setForm({ employeeId: '' });
    } else {
      setMessage(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Employee Check-Out</h2>

        <input
          type="text"
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Check Out
        </button>

        {message && (
          <p className="text-center text-green-600 font-medium mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}
