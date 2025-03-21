import { connectToDatabase } from "@/app/api/db/connect";
import User from "@/app/models/user";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectToDatabase();
    console.log("hit f");

    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error in Profile GET API:", error);
    return new Response("Server Error", { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectToDatabase();

    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) return new Response("Unauthorized", { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { phone, post, speciality } = await req.json();

    const user = await User.findById(decoded.id);
    if (!user) return new Response("User not found", { status: 404 });

    if (phone) user.phone = phone;
    if (post) user.post = post;
    if (speciality) user.speciality = speciality;

    await user.save();
    return new Response(
      JSON.stringify({ message: "Profile updated successfully", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Profile PATCH API:", error);
    return new Response("Server Error", { status: 500 });
  }
}
