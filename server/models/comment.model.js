import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    anime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
      required: [true, "Anime reference is required"],
    },
    episodeNumber: {
      type: Number,
      default: null, // null = comment on whole anime
    },
    text: {
      type: String,
      required: [true, "Comment text is required"],
      minlength: [1, "Comment cannot be empty"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
