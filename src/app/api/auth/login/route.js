import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = generateToken(user._id);

  return Response.json({ token, role: user.role });
}
