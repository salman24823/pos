'use client';
import { useEffect, useState } from 'react';

export default function AttendancePage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  // Fetch attendance on load
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/attendance');
        const data = await res.json();
        setHistory(data.attendance || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load attendance', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Submit attendance
  const handleCheck = async (type) => {
    try {
      const res = await fetch('/api/attendance', {
        method: 'POST',
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      setHistory((prev) => [...prev, data.record]);
      setStatus(`${type === 'in' ? 'Checked In' : 'Checked Out'} at ${data.record.time}`);
    } catch (error) {
      console.error('Check failed', error);
      setStatus('Failed to submit attendance');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🕒 Attendance</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => handleCheck('in')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ✅ Check In
        </button>
        <button
          onClick={() => handleCheck('out')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          🚪 Check Out
        </button>
      </div>

      {status && <p className="text-sm mb-4">{status}</p>}

      <h2 className="text-lg font-semibold mt-6 mb-2">📋 Attendance History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-white border rounded shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2">{record.date}</td>
                <td className="p-2">{record.time}</td>
                <td className="p-2 capitalize">{record.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
