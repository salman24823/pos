import { connectDB } from "@/lib/db"; 

import User from "@/models/User";
import { verifyToken } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function PATCH(req) {
  await connectDB();

  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];
  const userData = verifyToken(token);
  if (!userData) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email, phone, password, profilePic } = body;

  const update = {
    ...(name && { name }),
    ...(email && { email }),
    ...(phone && { phone }),
    ...(profilePic && { profilePic }),
  };

  if (password) {
    update.passwordHash = await bcrypt.hash(password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(userData.userId, update, {
    new: true,
  }).select("-passwordHash");

  return Response.json({ success: true, user: updatedUser });
}
