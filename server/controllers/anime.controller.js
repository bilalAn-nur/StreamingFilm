import { ACCESS_SECRET, JIKAN_URL, KITSU_URL } from "../config/env.js";
import Anime from "../models/anime.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const getAnimes = async (req, res, next) => {
  try {
    const animes = await Anime.find().sort({ createdAt: -1 });
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

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Token missing" });

    // Decode token untuk ambil userId
    const decoded = jwt.verify(token, ACCESS_SECRET);
    const userId = decoded.userId;

    const newAnime = await Anime.create(
      [
        {
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
          createdBy: userId,
        },
      ]
      // { session }
    );

    res.status(201).json({
      success: true,
      message: "Anime created successfully.",
      data: newAnime,
    });
  } catch (error) {
    next(error);
  }
};

// export const recomendation = async (req, res, next) => {};

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

export const mergedAnimeAPI = async (req, res, next) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: "Query is required" });
  setTimeout(() => console.log(""), 3000);

  try {
    // Ambil data anime yang sudah ada dari database
    const existingMovies = await Anime.find({});
    const existingMalIds = existingMovies.map((m) => m.mal_id);

    // Ambil data dari Jikan
    const jikanRes = await fetch(
      `${JIKAN_URL}/anime?q=${encodeURIComponent(query)}&limit=10`
    );
    const jikanData = await jikanRes.json();

    // Filter anime yang sudah ada
    const filteredJikan = jikanData.data.filter(
      (anime) => !existingMalIds.includes(anime.mal_id)
    );

    // Ambil data Kitsu dan gabungkan
    const results = await Promise.all(
      filteredJikan.map(async (anime) => {
        const kitsuRes = await fetch(
          `${KITSU_URL}/edge/anime?filter[text]=${encodeURIComponent(
            anime.title
          )}&page[limit]=1`
        ).then((r) => r.json());
        const kitsu = kitsuRes.data[0];

        return {
          title: anime.titles?.Default || anime.title,
          genres: anime.genres?.map((g) => g.name) || [],
          year: anime.season ? `${anime.season} ${anime.year || ""}` : "",
          episodesCount: kitsu?.attributes.episodeCount || anime.episodes || 0,
          imageUrl: kitsu?.attributes.posterImage?.small || "",
          bannerUrl: anime.images?.jpg?.image_url || "",
          synopsis:
            kitsu?.attributes.synopsis ||
            kitsu?.attributes.description ||
            anime.synopsis ||
            "",
          type: anime.type || kitsu?.attributes.showType || "",
          status: anime.status || kitsu?.attributes.status || "",
          score: anime.score || kitsu?.attributes.averageRating || null,
          mal_id: anime.mal_id,
          kitsu_io_id: kitsu?.id || null,
        };
      })
    );

    res.json(results);
  } catch (error) {
    next(error);
  }
};
