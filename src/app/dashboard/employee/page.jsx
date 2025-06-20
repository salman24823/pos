'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const dummyData = [
    { id:'E401' , name: "Abdul-Hamad", gmail: "abdulhamad444@gmail.com", contact: "03900578970" },
    { id:'E402' , name: "Abdul-Hammad", gmail: "abdulhamad445@gmail.com", contact: "03800594870" },
    { id:'E403' , name: "Abdul-Hamid", gmail: "abdulhamad446@gmail.com", contact: "03500674870" }
  ];
  
  useEffect( ()=> {
    async function fetchEmployees() {
      try{
      const res = await fetch('/api/employees');
      const data = await res.json();

      const combined = [
        ...dummyData,
        ...dbData.map((item) => ({
          _id: item._id,
          fullname: item.fullname || item.name, // fallback if "fullname" missing
          email: item.email,
          phone: item.phone,
        })),
      ];

      setEmployees(combined);
      }catch(error){
        console.error("Failed to fetch employees:", error);
        setEmployees(dummyData);
    }finally{
      setLoading(false);
    }
  }
    fetchEmployees();

  }, [] );

  if (loading) return <div className='p-6'>Loading...</div>

  return (
      <main className="flex-1 p-6 space-y-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-[#111827]">Employees</h1>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4 text-lg text-gray-700">Logged-In Employees</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b text-gray-600">
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Phone</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr
                    key={employee._id || employee.id || index }
                    className="border-b text-gray-500 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{employee.fullname || employee.name}</td>
                    <td className="px-6 py-4">
                      {employee._id ? (
                      <Link href={`/employees/${employee._id}`} className="text-blue-500 hover:underline">
                        {employee.email}
                      </Link>
                      ) : (
                        <span>{employee.gmail}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{employee.phone || employee.contact}</td>
                    <td className="px-6 py-4">
                      <button
                        className="bg-[#111827] text-white p-2 px-4 shadow-lg rounded-md hover:bg-[#1a2336] transition">
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