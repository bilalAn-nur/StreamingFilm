import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
  {
    mal_id: {
      type: Number,
    },
    kitsu_io_id: {
      type: String,
      unique: true,
      sparse: true,
    },
    title: {
      type: String,
      required: [true, "Anime title is required."],
      trim: true,
      minlength: [2, "Title must be at least 2 characters long."],
    },
    synopsis: {
      type: String,
      required: [true, "Synopsis is required."],
      minlength: [10, "Synopsis must be at least 10 characters long."],
    },
    type: {
      type: String,
      enum: ["TV", "OVA", "ONA", "Movie", "Special", "Music"],
      required: [true, "Anime type is required."],
    },
    episodesCount: {
      type: Number,
      min: [1, "Episodes count must be at least 1."],
    },
    status: {
      type: String,
      enum: ["Finished Airing", "Currently Airing", "Not yet aired"],
      default: "Not yet aired",
    },
    score: {
      type: Number,
      min: [0, "Score cannot be below 0."],
      max: [10, "Score cannot exceed 10."],
    },
    season: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required."],
      match: [
        /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/,
        "Invalid image URL format.",
      ],
    },
    bannerUrl: {
      type: String,
      match: [/^https?:\/\/.+/, "Invalid banner URL format."],
    },
    genres: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const Anime = mongoose.model("Anime", animeSchema);

export default Anime;
