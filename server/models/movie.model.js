import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  tittle: {
    type: String,
    require: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
