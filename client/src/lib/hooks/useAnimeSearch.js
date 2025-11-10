"use client";

import { useState, useEffect } from "react";
import { fetchMergedAnime } from "../actions/movieAction";

export default function useAnimeSearch(initialForm, setForm) {
  const [query, setQuery] = useState(initialForm.title || "");
  const [results, setResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(
    initialForm.title ? initialForm : null
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch anime ketika user mengetik
  useEffect(() => {
    if (!query.trim() || selectedAnime) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const data = await fetchMergedAnime(query);
      setResults(data);
      setShowDropdown(true);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, selectedAnime]);

  const handleChange = (value) => {
    if (!selectedAnime) {
      setQuery(value.toLowerCase());
    }
  };

  const handleSelect = (anime) => {
    setSelectedAnime(anime);
    setQuery(anime.title);
    setForm(anime);
    setShowDropdown(false);
  };

  const handleReset = () => {
    setSelectedAnime(null);
    setForm({
      title: "",
      genres: [],
      year: "",
      episodesCount: "",
      imageUrl: "",
      bannerUrl: "",
      synopsis: "",
      type: "",
      status: "",
      score: "",
      mal_id: null,
      kitsu_io_id: null,
    });
    setQuery("");
  };

  return {
    query,
    results,
    loading,
    showDropdown,
    selectedAnime,
    handleChange,
    handleSelect,
    handleReset,
    setShowDropdown,
  };
}
