import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: false }, // Make this optional
  instructor: { type: String, required: false }, // Make this optional
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
