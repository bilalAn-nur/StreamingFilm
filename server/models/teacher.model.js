import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nip: {
      type: String,
      required: [true, "NIP is required"],
      unique: true,
      match: [/^[0-9]{8,20}$/, "Format NIP is invalid"],
    },
    subjects: {
      type: [String],
      default: [],
    },
    position: {
      type: String,
      trim: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"],
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
