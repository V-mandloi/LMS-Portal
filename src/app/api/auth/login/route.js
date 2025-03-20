import { connectToDatabase } from "@/app/api/db/connect";
import User from "@/app/models/user";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response("All fields are required", { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return new Response("Invalid email or password", { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error("Error in Login API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
