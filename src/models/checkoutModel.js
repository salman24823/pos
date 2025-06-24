// import dbConnection from '@/config/db';
// import Checkout from '@/models/checkoutModel';

// export async function POST(req) {
//   await dbConnection();
//   const body = await req.json();

//   const { name, date, time, location, status } = body;

//   if (!name || !date || !time || !location) {
//     return Response.json({ message: 'Missing required fields' }, { status: 400 });
//   }

//   const newCheckout = await Checkout.create({ name, date, time, location, status });
//   return Response.json({ message: 'Check-out successful', checkout: newCheckout }, { status: 201 });
// }

// export async function GET() {
//   await dbConnection();
//   const checkouts = await Checkout.find().sort({ createdAt: -1 });
//   return Response.json(checkouts, { status: 200 });
// }


import mongoose from 'mongoose';

const checkoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, default: 'Checked-Out' },
  },
  { timestamps: true }
);

const Checkout = mongoose.models.Checkout || mongoose.model('Checkout', checkoutSchema);
export default Checkout;
