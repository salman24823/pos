import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  name: String,
  date: String,
  checkInTime: String,
  checkOutTime: String,
  timeSpent: String,
  status: String,
  location: String,
}, { timestamps: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);
