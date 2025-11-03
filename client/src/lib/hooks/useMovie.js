"use client";
import { useState, useEffect } from "react";
import api from "@/utils/axios";

export default function useMovie(hoveredMovie) {
  const defaultMovie = {
    posterUrl: "https://media.kitsu.app/anime/poster_images/13485/original.jpg",
    bannerUrl: "",
    title: "UMA MUSUME: CINDERELLA GRAY",
    genres: ["Sports", "Slice of Life", "Comedy", "Drama", "Music"],
    score: 8.9,
    episodesCount: 24,
    synopsis:
      "Follow the story of aspiring horse girls striving to become the best on the track while balancing friendship, competition, and dreams.",
  };

  const [movie, setMovie] = useState(defaultMovie);
  const [movies, setMovies] = useState([]); // untuk list movie
  const [fade, setFade] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch semua movies
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/anime");
        setMovies(data.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Update movie saat hoveredMovie berubah
  useEffect(() => {
    const targetMovie = hoveredMovie || defaultMovie;
    setFade(true);
    const timeout = setTimeout(() => {
      setMovie(targetMovie);
      setFade(false);
    }, 400);
    return () => clearTimeout(timeout);
  }, [hoveredMovie]);

  // Tentukan gambar utama (banner atau poster)
  const mainImage =
    movie.bannerUrl && movie.bannerUrl.startsWith("http")
      ? movie.bannerUrl
      : movie.posterUrl;

  return {
    movie,
    movies,
    loading,
    error,
    fade,
    mainImage,
  };
}
