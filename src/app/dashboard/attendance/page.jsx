'use client';
import { useState, useEffect } from 'react';
import { FiUser, FiCalendar, FiClock, FiMapPin, FiLoader, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function CheckInPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toISOString().split('T')[0],
    time: '',
    location: '',
  });
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Load existing records on component mount
  useEffect(() => {
    const records = JSON.parse(localStorage.getItem('checkInRecords')) || [];
    setAttendanceRecords(records);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const location = await getLocation();
      
      const newEntry = {
        ...formData,
        time: currentTime,
        location: location || 'Location not available',
        status: 'Checked-In',
        date: new Date().toLocaleDateString()
      };

      const updatedRecords = [...attendanceRecords, newEntry];
      localStorage.setItem('checkInRecords', JSON.stringify(updatedRecords));
      setAttendanceRecords(updatedRecords);
      
      // Reset form
      setFormData({
        name: '',
        date: new Date().toISOString().split('T')[0],
        time: '',
        location: '',
      });

      toast.success('Checked in successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          reject(new Error('Location access denied or unavailable'));
        }
      );
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Check-In Form */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
            <h2 className="text-2xl font-bold text-center">Employee Check-In</h2>
            <p className="text-center text-indigo-100 mt-1">Record your daily check-in</p>
          </div>

          {/* Form */}
          <form onSubmit={handleCheckIn} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Name Field */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiUser className="mr-2" /> Employee Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-200'
                  }`}
                  placeholder="Enter your full name"
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Date Display */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiCalendar className="mr-2" /> Date
                </label>
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              {/* Time Display */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiClock className="mr-2" /> Time
                </label>
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-blue-50 p-3 rounded-lg flex items-start">
              <FiMapPin className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Location Tracking</p>
                <p className="text-xs text-blue-600">
                  Your current location will be automatically recorded
                </p>
              </div>
            </div>

            {/* Check-In Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto md:px-8 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center ${
                loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Checking In...
                </>
              ) : (
                <>
                  <FiCheckCircle className="mr-2" />
                  Check In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Attendance Records Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
          <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
          
          {attendanceRecords.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No attendance records found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {attendanceRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}