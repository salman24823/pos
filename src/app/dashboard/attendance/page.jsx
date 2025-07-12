'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AttendancePage() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('today');

  useEffect(() => {
    fetchMergedAttendance();
  }, []);

  const fetchMergedAttendance = async () => {
    try {
      const res = await fetch('/api/attendance');
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      toast.error('Failed to fetch attendance');
    }
  };

  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const filteredRecords = records.filter((rec) => {
    const date = new Date(rec.date).toDateString();
    if (filter === 'today') return date === today;
    if (filter === 'yesterday') return date === yesterday;
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-center text-2xl font-bold text-gray-800">Employee Attendance</h1>

        {/* Filters */}
        <div className="flex justify-center gap-3">
          {['today', 'yesterday'].map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                filter === key ? 'bg-black text-white' : 'bg-gray-100'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm overflow-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Check-In</th>
                <th className="px-4 py-2">Check-Out</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{rec.name}</td>
                    <td className="px-4 py-2">{rec.date}</td>
                    <td className="px-4 py-2">{rec.checkInTime || '-'}</td>
                    <td className="px-4 py-2">{rec.checkOutTime || '-'}</td>
                    <td className="px-4 py-2">{rec.status}</td>
                    <td className="px-4 py-2">{rec.location}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
