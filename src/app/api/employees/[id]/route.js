'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { NextResponse } from "next/server";
import dbConnection from "@/app/config/db";
import User from '@/models/userModel';

export async function GET(req, { params }) {
  try {
    await dbConnection();
    const employee = await User.findById(params.id);
    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }
    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching employee" }, { status: 500 });
  }
}

export default function EmployeeDetailsPage() {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const router = useRouter();
  
  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`/api/employees/${id}`);
        const data = await response.json();
        if (response.ok) {
          setEmployee(data);
        } else {
          setError(data.message || 'Failed to fetch');
        }
      } catch (err) {
        setError('Failed to fetch employee details');
      }
    }
    if (id) fetchEmployee();
  }, [id]);

  const navItems = [
    'Dashboard', 'Parties', 'Product Manager', 'Employees', 'Purchases',
    'Stock Transfer', 'POS', 'Cash & Bank', 'Expenses', 'Staff Members',
    'Sales Reports', 'Online Orders', 'Settings', 'Subscription', 'Logout',
  ];
  
  
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0E0E18] text-white p-4 space-y-4">
        <div className="text-2xl font-bold mb-6">
          panze <span className="text-sm">studio</span>
        </div>
        <nav className="space-y-2 text-sm">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item === 'Dashboard' ? '/dashboard' : item === 'Employees' ? '/employees' : '#'}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 ${
                item === 'Employees' ? 'bg-gray-700' : ''
              }`}
            >
              <span className="text-lg">🔹</span>
              <span>{item}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Employee Details</h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {employee ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4 text-lg text-gray-800">{employee.name}</h2>
            <div className="text-sm space-y-3 text-gray-700">
              <p><strong className="font-medium">ID:</strong> {employee.id}</p>
              <p><strong className="font-medium">Name:</strong> {employee.name}</p>
              <p><strong className="font-medium">Email:</strong> {employee.email}</p>
              <p><strong className="font-medium">Phone:</strong> {employee.phone}</p>
              <p><strong className="font-medium">Department:</strong> {employee.department}</p>
            </div>
            <button
              onClick={() => router.push('/employees')}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Back to Employees
            </button>
          </div>
        ) : !error && (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </main>
    </div>
  );
}