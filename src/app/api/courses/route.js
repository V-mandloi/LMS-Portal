import { connectToDatabase } from "@/app/api/db/connect";
import Course from "@/app/models/course";

export async function GET(req) {
  try {
    await connectToDatabase();
    const courses = await Course.find({}); // Fetch all courses from the database
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/courses:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    if (!body.title || !body.description) {
      return new Response("Missing required fields", { status: 400 });
    }

    const newCourse = new Course({
      title: body.title,
      description: body.description,
      price: body.price || 0,
      instructor: body.instructor || "Unknown",
    });

    await newCourse.save();
    return new Response(JSON.stringify(newCourse), { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/courses:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
