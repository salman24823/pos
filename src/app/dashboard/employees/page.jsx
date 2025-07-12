'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [ loading, setLoading ] = useState(true);
  
  useEffect( ()=> {
    async function fetchEmployees() {
      try{
      const res = await fetch('/api/employees');
      const data = await res.json();

      setEmployees(data);
      }catch(error){
        console.error("Failed to fetch employees:", error);
        setEmployees([]);
    }finally{
      setLoading(false);
    }
  }
    fetchEmployees();

  }, [] );

  if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 px-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#111827] border-dashed rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700">Loading employees...</p>
      </div>
    </div>
  );
}

  return (
      <main className="flex-1 px-4 py-6 sm:px-6 md:px-10 space-y-6 bg-gray-100">
        <h1 className="text-2xl sm:text-2xl font-bold mb-4 text-[#111827]">Employees</h1>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
          <h2 className="bg-white p-4 sm:p-6 rounded-xl shadow">Logged-In Employees</h2>
          <div className="overflow-auto">
            <table className="min-w-full text-sm sm:text-base">
              <thead>
                <tr className="text-left border-b text-gray-600">
                  <th className="px-4 sm:px-6 py-3">Name</th>
                  <th className="px-4 sm:px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id || index} className="border-b text-gray-500 hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">{employee.fullname || employee.name}</td>
                  <td className="px-4 sm:px-6 py-4">
                    <Link href={`/dashboard/employees/${employee._id}`} className="text-blue-500 hover:underline break-all">
                      {employee.email}
                    </Link>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <button className="bg-[#111827] text-white py-1 px-3 sm:py-2 sm:px-4 shadow rounded-md hover:bg-[#1a2336] transition">
                      Terminate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </main>
  );
}