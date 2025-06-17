'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ActiveEmployeesPage() {
  const [employees] = useState([
    { id: 'E001', name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', department: 'Engineering' },
    { id: 'E002', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', department: 'Marketing' },
    { id: 'E003', name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '555-123-4567', department: 'HR' },
    { id: 'E004', name: 'Bob Wilson', email: 'bob.wilson@example.com', phone: '777-888-9999', department: 'Finance' },
    { id: 'E005', name: 'Emma Brown', email: 'emma.brown@example.com', phone: '222-333-4444', department: 'Sales' },
  ]);

  const navItems = [
    'Dashboard', 'Parties', 'Product Manager', 'Employees', 'Active Employees', 'Purchases',
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
              href={
                item === 'Dashboard' ? '/dashboard' :
                item === 'Employees' ? '/employees' :
                item === 'Active Employees' ? '/employees/active' : '#'
              }
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-800 ${
                item === 'Active Employees' ? 'bg-gray-700' : ''
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
        <h1 className="text-3xl font-bold mb-6">Active Employees</h1>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 text-lg">Active Employees List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-500">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{employee.id}</td>
                    <td className="px-6 py-4">
                      <Link href={`/employees/${employee.id}`} className="text-blue-500 hover:underline">
                        {employee.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{employee.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}