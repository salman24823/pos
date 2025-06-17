'use client';
import { useEffect, useState } from 'react';

export default function AttendanceListPage() {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('attendanceList')) || [];
    setAttendanceList(data);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">All Attendance Records</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Location</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">No attendance found</td>
              </tr>
            ) : (
              attendanceList.map((entry, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{entry.name}</td>
                  <td className="p-3">{entry.date}</td>
                  <td className="p-3">{entry.time}</td>
                  <td className="p-3">{entry.status}</td>
                  <td className="p-3">{entry.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
