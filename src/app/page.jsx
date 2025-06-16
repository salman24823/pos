'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-600 text-white text-xl font-bold rounded-full flex items-center justify-center shadow-lg">
            S
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">Login to Pos</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-500">
          Don’t have an account?{' '}
          <Link href="/register" className="text-indigo-600 hover:underline font-semibold">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
