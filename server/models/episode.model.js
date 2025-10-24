import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    anime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Anime",
      required: [true, "Related anime is required."],
    },
    title: {
      type: String,
      required: [true, "Episode title is required."],
      trim: true,
    },
    episodeNumber: {
      type: Number,
      required: [true, "Episode number is required."],
      min: [1, "Episode number must be greater than 0."],
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required."],
      match: [/^https?:\/\/.+/, "Invalid video URL format."],
    },
    duration: {
      type: String, // e.g. "23 min"
    },
    description: {
      type: String,
      minlength: [5, "Description must be at least 5 characters long."],
    },
  },
  { timestamps: true }
);

const Episode = mongoose.model("Episode", episodeSchema);

export default Episode;
