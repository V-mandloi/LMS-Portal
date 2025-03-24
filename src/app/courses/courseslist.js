"use client";

import { useState } from "react";
import useCourses from "@/app/hooks/useCourses";

export default function CoursesList() {
  const { courses, loading, addCourse } = useCourses();
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
    instructor: "",
    image: "",
  });

  console.log("Courses:", courses); // Debugging log
  console.log("Loading:", loading);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="hover:bg-gray-700 bg-gray-600 rounded-lg shadow-md overflow-hidden transition border border-transparent hover:border-gray-500"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="white">{course.description}</p>
              <p className="white font-bold">${course.price}</p>
              <p className="white italic">By {course.instructor}</p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
