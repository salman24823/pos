import mongoose from 'mongoose';

const checkinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Checked-In',
    },
  },
  { timestamps: true }
);

const Checkin = mongoose.models.Checkin || mongoose.model('Checkin', checkinSchema);
export default Checkin;
