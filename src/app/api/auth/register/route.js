import { connectToDatabase } from "@/app/api/db/connect";
import User from "@/app/models/user";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response("All fields are required", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 400 });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in Register API:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
