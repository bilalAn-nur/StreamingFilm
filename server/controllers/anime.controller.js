import Anime from "../models/anime.model.js";
import User from "../models/user.model.js";

export const getAnimes = async (req, res, next) => {
  try {
    const animes = await Anime.find();
    res.status(200).json({
      success: true,
      message: "Animes retrieved successfully",
      data: animes,
    });
  } catch (error) {
    next(error);
  }
};

export const createAnime = async (req, res, next) => {
  try {
    const {
      mal_id,
      kitsu_io_id,
      title,
      synopsis,
      type,
      episodesCount,
      status,
      season,
      score,
      imageUrl,
      bannerUrl,
      genres,
    } = req.body;

    const newAnime = await Anime.create({
      mal_id,
      kitsu_io_id,
      title,
      synopsis,
      type,
      episodesCount,
      status,
      season,
      score,
      imageUrl,
      bannerUrl,
      genres,
    });

    res.status(201).json({
      success: true,
      message: "Anime created successfully.",
      data: newAnime,
    });
  } catch (error) {
    next(error);
  }
};

export const recomendation = async (req, res, next) => {};

export const likeAnime = async (req, res, next) => {
  try {
    const { userId, animeId } = req.body;

    const user = await User.findById(userId);
    const anime = await Anime.findById(animeId);

    if (!user || !anime)
      return res.status(404).json({ message: "Not Found!!" });
  } catch (error) {
    next(error);
  }
};
