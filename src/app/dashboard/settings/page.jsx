'use client';
import { useState } from 'react';

export default function StaffSettingsPage() {
  const [name, setName] = useState('Talha Staff');
  const [email, setEmail] = useState('staff@example.com');
  const [phone, setPhone] = useState('03XX-XXXXXXX');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleSave = () => {
    alert('Settings updated ✅');
    // Later: POST to /api/user/update
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">👤 Staff Settings</h1>

      <div className="max-w-xl mx-auto bg-gray-100 p-8 rounded-lg space-y-6 shadow">
        {/* Profile Picture */}
        <div className="text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-4 border-black">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xl text-white font-bold">?</div>
            )}
          </div>
          <input type="file" onChange={handleImageChange} className="text-sm" />
        </div>

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
