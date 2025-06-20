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
    <div className="flex min-h-screen w-full">

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-[#111827]">Active Employees</h1>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 text-lg text-gray-700">Active Employees List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-600">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b text-gray-500 hover:bg-gray-50"
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