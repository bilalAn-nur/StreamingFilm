import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nis: {
      type: String,
      required: [true, "NIS is required"],
      unique: true,
      match: [/^[0-9]{6,15}$/, "Format NIS is invalid"],
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: [true, "Class ID is required"],
    },
    birthDate: {
      type: Date,
      required: [true, "Birth date is required"],
    },
    parentName: {
      type: String,
      required: [true, "Parent name is required"],
      trim: true,
    },
    parentContact: {
      type: String,
      required: [true, "Parent contact is required"],
      trim: true,
      match: [/^\+?[1-9]\d{1,16}$/, "Please fill a valid phone number"],
    },
    enrollmentYear: {
      type: Number,
      required: [true, "Enrollment year is required"],
      min: [2000, "Enrollment year must be after 2000"],
      max: [
        new Date().getFullYear(),
        "Enrollment year cannot be in the future",
      ],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "graduated", "transferred"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
