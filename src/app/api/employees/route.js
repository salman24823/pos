
import dbConnection from '@/config/db';
import User from '@/models/userModel';

export async function GET(req) {
  try {
    await dbConnection();
    const employees = await User.find({ isTerminate: false });
    return Response.json(employees);
  } catch (error) {
    return Response.json({ error: "Error fetching employees" }, { status: 500 });
  }
}

