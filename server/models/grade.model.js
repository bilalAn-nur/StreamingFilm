import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    semester: {
      type: String,
      enum: ["first", "second"],
      required: [true, "Semester is required"],
    },
    score: {
      uts: {
        type: Number,
        required: [true, "UTS score is required"],
        min: [0, "Score must be at least 0"],
        max: [100, "Score cannot exceed 100"],
      },
      uas: {
        type: Number,
        required: [true, "UAS score is required"],
        min: [0, "Score must be at least 0"],
        max: [100, "Score cannot exceed 100"],
      },
      task: {
        type: Number,
        required: [true, "Task score is required"],
        min: [0, "Score must be at least 0"],
        max: [100, "Score cannot exceed 100"],
      },
    },
    avarage: {
      type: Number,
      min: [0, "Avarage must be at least 0"],
      max: [100, "Avarage cannot exceed 100"],
    },
  },
  { timestamps: true }
);

gradeSchema.pre("save", function (next) {
  const { uts, uas, task } = this.score;
  this.average = ((uts + uas + task) / 3).toFixed(2);
  next();
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
