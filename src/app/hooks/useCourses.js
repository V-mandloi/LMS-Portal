"use client";

import { useState, useEffect } from "react";
import api from "@/app/services/api";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    setLoading(true);
    api
      .get("/api/courses")
      .then((res) => {
        if (!res.data || typeof res.data !== "object") {
          throw new Error("Invalid data format received");
        }
        setCourses(res.data);
      })
      .catch((err) => console.error("Failed to fetch courses:", err))
      .finally(() => setLoading(false));
  };

  const addCourse = (course) => {
    console.log("Adding course:", course); // Debugging log
    setLoading(true);
    api
      .post("/api/courses", course)
      .then(() => fetchCourses())
      .catch((err) => console.error("Failed to add course:", err))
      .finally(() => setLoading(false));
  };

  return { courses, loading, addCourse };
};

export default useCourses;
