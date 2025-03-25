import { connectToDatabase } from "@/app/api/db/connect";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
  try {
    const { userId, courseId } = await req.json();

    if (!userId || !courseId) {
      return new Response(
        JSON.stringify({ message: "Missing userId or courseId" }),
        { status: 400 }
      );
    }

    console.log("Received userId:", userId);
    console.log("Received courseId:", courseId);

    const { db } = await connectToDatabase();

    // Validate userId and courseId
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(courseId)) {
      return new Response(
        JSON.stringify({ message: "Invalid userId or courseId" }),
        { status: 400 }
      );
    }

    // Find the user by ID
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    console.log("User document before update:", user);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Check if the courseId exists in the enrolledCourses array
    const courseIdObject = new ObjectId(courseId);
    const isCourseEnrolled = user.enrolledCourses.some((id) =>
      id.equals(courseIdObject)
    );
    if (!isCourseEnrolled) {
      return new Response(
        JSON.stringify({ message: "Course not found in enrolledCourses" }),
        { status: 404 }
      );
    }

    // Remove the courseId from the enrolledCourses array
    const result = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { enrolledCourses: courseIdObject } }
      );

    console.log("Update result:", result);

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({
          message: "Failed to delete the course or course not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Successfully deleted the course" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting course:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
