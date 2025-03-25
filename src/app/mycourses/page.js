"use client";

import { useState, useEffect } from "react";
import { decodeToken } from "@/app/utils/auth";
import { useFetchImage } from "@/app/hooks/usefetchimages";

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch images once
  const { imageUrl: course1, error: course1Error } =
    useFetchImage("course1.jpg");
  const { imageUrl: course2, error: course2Error } =
    useFetchImage("course2.jpg");
  const { imageUrl: course3, error: course3Error } =
    useFetchImage("course3.jpg");

  const courseImages = [
    { imageUrl: course1, name: "Course 1", error: course1Error },
    { imageUrl: course2, name: "Course 2", error: course2Error },
    { imageUrl: course3, name: "Course 3", error: course3Error },
  ];

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.id) {
        setUserId(decoded.id);
        fetchEnrolledCourses(decoded.id);
      } else {
        console.error("Invalid token or missing user ID");
        setLoading(false);
      }
    } else {
      setFeedback("User not authenticated. Please log in.");
      setLoading(false);
    }
  }, []);

  const fetchEnrolledCourses = async (userId) => {
    try {
      const response = await fetch(`/api/enroll/getCourses?userId=${userId}`);
      const data = await response.json();
      if (response.ok) {
        setEnrolledCourses(data.courses);
      } else {
        setFeedback(data.message || "Failed to fetch enrolled courses.");
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setFeedback("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await fetch(`/api/enroll/deleteCourse`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId }),
      });

      const data = await response.json();
      if (response.ok) {
        setFeedback(data.message);
        setEnrolledCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );
      } else {
        setFeedback(data.message || "Failed to delete the course.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      setFeedback("An error occurred. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!enrolledCourses.length)
    return <p>You have not enrolled in any courses yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      {feedback && <p className="text-red-500 mb-4">{feedback}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrolledCourses.map((course, index) => {
          // Cycle through predefined images
          const imageIndex = index % courseImages.length;
          const { imageUrl, name, error } = courseImages[imageIndex];

          return (
            <div
              key={course._id}
              className="hover:bg-gray-700 bg-gray-600 rounded-lg shadow-md overflow-hidden transition border border-transparent hover:border-gray-500"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <p>Loading {name}...</p>
              )}
              {error && (
                <p className="text-red-500">
                  Error loading {name}: {error}
                </p>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="white">{course.description}</p>
                <p className="white font-bold">${course.price}</p>
                <p className="white italic">By {course.instructor}</p>
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
