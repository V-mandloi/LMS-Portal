import { connectToDatabase } from "@/app/api/db/connect";
import User from "@/app/models/user";
import Course from "@/app/models/course";

export async function POST(req) {
  try {
    const { userId, courseId } = await req.json();

    if (!userId || !courseId) {
      return new Response(
        JSON.stringify({ message: "Missing userId or courseId" }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return new Response(JSON.stringify({ message: "Course not found" }), {
        status: 404,
      });
    }

    // Update the user's enrolledCourses array
    const result = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledCourses: courseId } }, // Prevent duplicates
      { new: true }
    );

    if (!result) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Successfully enrolled in the course" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
