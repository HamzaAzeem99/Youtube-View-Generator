import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be at least 1"]
  },
  course: {
    type: String,
    required: [true, "Course is required"],
    trim: true
  },
  semester: {
    type: Number,
    required: [true, "Semester is required"],
    min: [1, "Semester must be at least 1"]
  }
}, {
  timestamps: true,
  collection: 'test' // Use the existing 'test' collection
});

const Student = mongoose.model("Student", studentSchema);

export default Student;