import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Class name is required"],
      trim: true,
    },
    gradeLevel: {
      type: Number,
      required: [true, "Grade level is required"],
      min: [1, "Grade level must be at least 1"],
      max: [12, "Grade level must be at most 12"],
    },
    mayor: {
      type: String,
      trim: true,
    },
    homeroomTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
