import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name must be at most 50 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      minlength: [5, "Email must be at least 5 characters long"],
      maxlength: [100, "Email must be at most 100 characters long"],
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "student", "parent", "principal"],
      required: [true, "Role is required"],
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: [/^(?:\+62|62|0)8\d{7,12}$/, "Please fill a valid phone number"],
      required: [true, "Phone number is required"],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [225, "Address must be at most 225 characters long"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
