'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:3002/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    let result = await res.json();

    if (res.ok) {
      alert("🎉 Registered successfully!");
      // You can navigate to login or clear form:
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    } else {
      alert(`❌ ${result.message}`);
    }
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Something went wrong.");
  }
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

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-700">Create Your Account</h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sign up to access the Pos platform
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              type="text"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-indigo-400"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-indigo-400"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-indigo-400"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-gray-700 focus:ring-indigo-400"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-500">
          Already have an account?{' '}
          <Link href="/" className="text-indigo-600 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
