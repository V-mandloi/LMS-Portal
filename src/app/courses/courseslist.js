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
  });

  console.log("Courses:", courses); // Debugging log
  console.log("Loading:", loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(newCourse);
    setNewCourse({ title: "", description: "", price: "", instructor: "" });
  };

  if (loading) return <p>Loading...</p>;
  if (!courses.length) return <p>No courses available.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Courses</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newCourse.title}
          onChange={(e) =>
            setNewCourse({ ...newCourse, title: e.target.value })
          }
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newCourse.description}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          placeholder="price"
          value={newCourse.price}
          onChange={(e) =>
            setNewCourse({ ...newCourse, price: e.target.value })
          }
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="instructor"
          value={newCourse.instructor}
          onChange={(e) =>
            setNewCourse({ ...newCourse, instructor: e.target.value })
          }
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Course
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <p className="text-gray-600">{course.price}</p>
            <p className="text-gray-600">{course.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
