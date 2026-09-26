import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Student Management API",
    version: "1.0.0",
    endpoints: {
      "POST /api/students": "Add a new student",
      "GET /api/students": "Get all students",
      "GET /api/students/:id": "Get a single student",
      "PUT /api/students/:id": "Update student information",
      "DELETE /api/students/:id": "Delete a student"
    }
  });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});