import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    semester: {
      type: String,
      enum: ["first", "second"],
      required: [true, "Semester is required"],
    },
    year: {
      type: Number,
      required: [true, "Year is required"],
    },
    grade: [
      {
        subjectId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subject",
        },
        avarage: {
          type: Number,
          min: [0, "Avarage must be at least 0"],
          max: [100, "Avarage cannot exceed 100"],
        },
      },
    ],
    attendanceSummary: {
      present: {
        type: Number,
        default: 0,
      },
      absent: {
        type: Number,
        default: 0,
      },
      sick: {
        type: Number,
        default: 0,
      },
      excused: {
        type: Number,
        default: 0,
      },
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
