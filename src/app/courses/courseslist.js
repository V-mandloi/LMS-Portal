"use client";

import { useState, useEffect } from "react";
import useCourses from "@/app/hooks/useCourses";
import { decodeToken } from "@/app/utils/auth";
import { useFetchImage } from "@/app/hooks/usefetchimages";

export default function CoursesList() {
  const { courses, loading, addCourse } = useCourses();
  const [newCourse, setNewCourse] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    instructor: "",
    image: "",
  });
  const [feedback, setFeedback] = useState("");
  const [userId, setUserId] = useState(null);

  // Fetch images once
  const { imageUrl: course1, error: course1Error } =
    useFetchImage("course1.jpg");
  const { imageUrl: course2, error: course2Error } =
    useFetchImage("course2.jpg");
  const { imageUrl: course3, error: course3Error } =
    useFetchImage("course3.jpg");
  console.log("course1", course1);
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
        console.log("USERid", decoded.id);
      } else {
        console.error("Invalid token or missing user ID");
      }
    }
  }, []);

  const handleEnroll = async (courseId) => {
    if (!userId) {
      setFeedback("User not authenticated. Please log in.");
      return;
    }

    try {
      console.log("course", courseId);
      const response = await fetch("/api/enroll/putCourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, courseId }),
      });

      const data = await response.json();
      if (response.ok) {
        setFeedback(data.message); // Show success message
      } else {
        setFeedback(data.message || "Failed to enroll in the course");
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setFeedback("An error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(newCourse);
    setNewCourse({
      title: "",
      description: "",
      price: "",
      instructor: "",
      image: "",
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!courses.length) return <p>No courses available.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) =>
            setNewCourse({ ...newCourse, title: e.target.value })
          }
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          className="border p-2"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newCourse.price}
          onChange={(e) =>
            setNewCourse({ ...newCourse, price: e.target.value })
          }
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Instructor"
          value={newCourse.instructor}
          onChange={(e) =>
            setNewCourse({ ...newCourse, instructor: e.target.value })
          }
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCourse.image}
          onChange={(e) =>
            setNewCourse({ ...newCourse, image: e.target.value })
          }
          className="border p-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Course
        </button>
      </form>
      {feedback && <p className="text-green-500 mb-4">{feedback}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => {
          // Use modulo to cycle through images
          const imageIndex = index % courseImages.length;
          const { imageUrl, name, error } = courseImages[imageIndex];

          return (
            <div
              key={course.id}
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
                  onClick={() => handleEnroll(course.id || course._id)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
