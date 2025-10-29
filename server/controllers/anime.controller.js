import Anime from "../models/anime.model.js";

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

// export const getAnime = async (req, res, next) => {
//     try {
//         const anime = await Anime.findOne
//     } catch (error) {
//         next(error)
//     }
// }
