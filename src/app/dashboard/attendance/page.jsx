'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AttendancePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    status: 'Present',
    time: '',
    location: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentTime = new Date().toLocaleTimeString();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`;

          const newEntry = {
            ...formData,
            time: currentTime,
            location: userLocation,
          };

          const existing = JSON.parse(localStorage.getItem('attendanceList')) || [];
          existing.push(newEntry);
          localStorage.setItem('attendanceList', JSON.stringify(existing));

          router.push('/dashboard/attendance/show');
        },
        (error) => {
          alert('Failed to get location: ' + error.message);
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation not supported.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">Submit Attendance</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Employee Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Date</label>
<input
  name="date"
  value={formData.date}
  onChange={handleChange}
  type="date"
  required
  min={new Date().toISOString().split('T')[0]}
  max={new Date().toISOString().split('T')[0]}
  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
/>

          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option>Present</option>
              <option>Absent</option>
              <option>Leave</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
          >
            {loading ? 'Submitting...' : 'Submit Attendance'}
          </button>
        </form>
      </div>
    </div>
  );
}
