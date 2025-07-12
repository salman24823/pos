'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FiUser, FiDollarSign, FiCalendar } from 'react-icons/fi';

export default function EmployeeSalaryPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [weeklyPay, setWeeklyPay] = useState(0);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        // Fetch employee info
        const empRes = await fetch(`/api/employees/${id}`);
        const empData = await empRes.json();
        setEmployee(empData);

        // Fetch attendance
        const attRes = await fetch(`/api/attendance/${id}`);
        const attData = await attRes.json();
        setAttendance(attData);

        // Calculate salary based on random hourly rate
        let rate = [10, 15, 20][Math.floor(Math.random() * 3)];
        let totalMinutes = 0;

        for (const record of attData) {
          if (record.timeSpent) {
            const match = record.timeSpent.match(/(\d+)h (\d+)m/);
            if (match) {
              const hrs = parseInt(match[1], 10);
              const mins = parseInt(match[2], 10);
              totalMinutes += hrs * 60 + mins;
            }
          }
        }

        const hoursWorked = totalMinutes / 60;
        setWeeklyPay((hoursWorked * rate).toFixed(2));
      } catch (error) {
        console.error('Error loading employee data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  if (!employee) return <div className="p-10 text-center text-red-500">Employee not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FiUser className="mr-2" /> {employee.fullname || employee.name}
        </h1>

        <p className="mb-2 text-gray-600 flex items-center">
          <FiDollarSign className="mr-2" /> Weekly Pay: <strong className="ml-2 text-black">€{weeklyPay}</strong>
        </p>

        <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2 flex items-center">
          <FiCalendar className="mr-2" /> Past 7 Days Attendance
        </h2>

        <table className="w-full table-auto text-sm mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Check-In</th>
              <th className="px-3 py-2 text-left">Check-Out</th>
              <th className="px-3 py-2 text-left">Time Spent</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, i) => (
              <tr key={i} className="border-b">
                <td className="px-3 py-2">{record.date}</td>
                <td className="px-3 py-2">{record.checkInTime || '-'}</td>
                <td className="px-3 py-2">{record.checkOutTime || '-'}</td>
                <td className="px-3 py-2">{record.timeSpent || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
