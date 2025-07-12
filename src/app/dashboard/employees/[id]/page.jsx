'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FiUser, FiDollarSign, FiCalendar, FiEdit2, FiSave } from 'react-icons/fi';

export default function EmployeeSalaryPage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [weeklyPay, setWeeklyPay] = useState('');
  const [newPay, setNewPay] = useState('');
  const [editingPay, setEditingPay] = useState(false);
  const [payHistory, setPayHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchData();
  }, [id]);

  async function fetchData() {
    try {
      const empRes = await fetch(`/api/employees/${id}`);
      const empData = await empRes.json();
      setEmployee(empData);
      setPayHistory(empData.payHistory || []);

      const attRes = await fetch(`/api/attendance/${id}`);
      const attData = await attRes.json();
      setAttendance(attData);

      const rate = [10, 15, 20][Math.floor(Math.random() * 3)];
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
      const calculatedPay = (hoursWorked * rate).toFixed(2);
      setWeeklyPay(calculatedPay);
      setNewPay(calculatedPay);
    } catch (error) {
      console.error('Error loading employee data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handlePaySave = async () => {
    try {
      const res = await fetch(`/api/employees/${id}/pay`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPay: parseFloat(newPay) }),
      });
      const data = await res.json();
      setPayHistory(data.payHistory);
      setWeeklyPay(newPay);
      setEditingPay(false);
    } catch (error) {
      console.error('Error updating pay:', error);
    }
  };

  const getWeeklyAbsent = () => {
    const uniqueDates = new Set(attendance.map((a) => a.date));
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    });
    const absentDays = last7Days.filter((d) => !uniqueDates.has(d));
    return absentDays.length;
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!employee) return <div className="p-10 text-center text-red-500">Employee not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
      {/* Main Content */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FiUser className="mr-2" /> {employee.fullname || employee.name}
        </h1>

        <p className="mb-2 text-gray-600 flex items-center">
          <FiCalendar className="mr-2" /> Weekly Absents:{' '}
          <strong className="ml-2 text-black">{getWeeklyAbsent()}</strong>
        </p>

        <div className="flex items-center mb-4">
          <FiDollarSign className="mr-2" />
          {editingPay ? (
            <>
              <input
                type="number"
                value={newPay}
                onChange={(e) => setNewPay(e.target.value)}
                className="border px-2 py-1 rounded mr-2 w-28"
              />
              <button
                onClick={handlePaySave}
                className="bg-green-600 text-white px-3 py-1 rounded flex items-center"
              >
                <FiSave className="mr-1" /> Save
              </button>
            </>
          ) : (
            <>
              <span className="text-black font-semibold text-lg">€{weeklyPay}</span>
              <button
                onClick={() => setEditingPay(true)}
                className="ml-4 text-sm text-blue-500 flex items-center"
              >
                <FiEdit2 className="mr-1" /> Edit
              </button>
            </>
          )}
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Past 7 Days Attendance</h2>
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

      {/* Sidebar */}
      <div className="w-full md:w-1/3 md:sticky md:top-6 md:self-start bg-white p-6 rounded-xl shadow h-fit">
        <h3 className="text-lg font-bold mb-4">Pay History</h3>
        <ul className="space-y-2 text-sm text-gray-700 max-h-96 overflow-y-auto">
          {payHistory.length === 0 && <li>No pay history available</li>}
          {payHistory
            .slice()
            .reverse()
            .map((entry, i) => (
              <li key={i} className="border p-2 rounded-md">
                €{entry.amount} —{' '}
                <span className="text-xs text-gray-500">{new Date(entry.date).toLocaleString()}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
