import { connectToDatabase } from "@/app/api/db/connect";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response(JSON.stringify({ message: "Missing userId" }), {
      status: 400,
    });
  }

  try {
    const { db } = await connectToDatabase(); // Ensure this returns the database connection

    // Find the user by ID
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    if (!user || !user.enrolledCourses || user.enrolledCourses.length === 0) {
      return new Response(JSON.stringify({ courses: [] }), { status: 200 });
    }

    // Fetch the courses the user is enrolled in
    const courses = await db
      .collection("courses")
      .find({
        _id: { $in: user.enrolledCourses.map((id) => new ObjectId(id)) },
      })
      .toArray();

    return new Response(JSON.stringify({ courses }), { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
