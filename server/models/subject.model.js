import mongoose from "mongoose";

const subjectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject name is required"],
  },
  code: {
    type: String,
    required: [true, "Subject code is required"],
    unique: true,
    upperscase: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description must be at most 500 characters long"],
  },
  semester: {
    type: String,
    enum: ["first", "second"],
    required: [true, "Semester is required"],
  },
});

const Subject = mongoose.model("Subject", subjectsSchema);

export default Subject;
