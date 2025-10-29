"use client";

import { useState, useEffect } from "react";

export default function MovieForm({
  editing,
  form,
  setForm,
  onSubmit,
  onCancel,
}) {
  const [query, setQuery] = useState(form.title || "");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(
    form.title ? { ...form } : null
  );
  const [existingMovies, setExistingMovies] = useState([]);

  // Fetch existing anime from backend
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/anime")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setExistingMovies(data);
        else if (Array.isArray(data.data)) setExistingMovies(data.data);
        else setExistingMovies([]);
      })
      .catch(() => setExistingMovies([]));
  }, []);

  // Search anime when query changes
  useEffect(() => {
    if (!query.trim() || selectedAnime) return setResults([]);
    const timer = setTimeout(() => searchAnime(query), 400);
    return () => clearTimeout(timer);
  }, [query, selectedAnime, existingMovies]);

  async function searchAnime(q) {
    setLoading(true);
    try {
      const resultsSet = [];

      // Kitsu API
      const kitsuRes = await fetch(
        `https://kitsu.io/api/edge/anime?filter[text]=${q}&page[limit]=5`
      ).then((r) => r.json());

      kitsuRes.data.forEach((item) => {
        resultsSet.push({
          id: item.id,
          source: "kitsu",
          title: item.attributes.canonicalTitle,
          episodesCount: item.attributes.episodeCount,
          imageUrl: item.attributes.posterImage?.small,
          bannerUrl: item.attributes.coverImage?.original,
          genres: item.attributes.slug ? [item.attributes.slug] : [],
        });
      });

      // Jikan API
      const jikanRes = await fetch(
        `https://api.jikan.moe/v4/anime?q=${q}&limit=5`
      ).then((r) => r.json());

      jikanRes.data.forEach((item) => {
        // cari data dari Kitsu yang sama berdasarkan judul
        const matchingKitsu = resultsSet.find((k) => k.title === item.title);

        resultsSet.push({
          id: item.mal_id,
          source: "jikan",
          title: item.title,
          mal_id: item.mal_id,
          kitsu_io_id: matchingKitsu ? matchingKitsu.id : null,
          synopsis: item.synopsis,
          type: item.type,
          status: item.status,
          season: item.season ? `${item.season} ${item.year || ""}` : "",
          score: item.score,
          genres: item.genres?.map((g) => g.name) || [],
          episodesCount: matchingKitsu?.episodesCount || item.episodes,
          imageUrl: matchingKitsu?.imageUrl || item.images?.jpg.image_url,
          bannerUrl: matchingKitsu?.bannerUrl || item.images?.jpg.image_url,
        });
      });

      // Filter anime yang sudah ada di MongoDB
      const filtered = resultsSet.filter(
        (anime) =>
          !existingMovies.some(
            (m) =>
              (anime.source === "kitsu" && m.kitsu_io_id === anime.id) ||
              (anime.source === "jikan" && m.mal_id === anime.id)
          )
      );

      setResults(filtered);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSelect = (anime) => {
    setForm({
      title: anime.title,
      genre: anime.genres.join(", "),
      year: anime.season,
      episodesCount: anime.episodesCount,
      imageUrl: anime.imageUrl,
      bannerUrl: anime.bannerUrl,
      synopsis: anime.synopsis,
      type: anime.type,
      status: anime.status,
      score: anime.score,
      mal_id: anime.source === "jikan" ? anime.mal_id : null,
      kitsu_io_id:
        anime.source === "kitsu" ? anime.kitsu_io_id || anime.id : null,
    });
    setSelectedAnime(anime);
    setQuery(anime.title);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    if (!selectedAnime) setQuery(e.target.value);
  };

  const handleReset = () => {
    setSelectedAnime(null);
    setForm({
      title: "",
      genre: "",
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

  return (
    <form onSubmit={onSubmit} className="p-4 space-y-4">
      {/* Title input with autocomplete */}
      <div className="relative">
        <label className="block text-sm font-medium mb-1 text-white">
          Title
        </label>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => !selectedAnime && setShowDropdown(true)}
          placeholder="Search anime..."
          disabled={!!selectedAnime}
          className={`w-full rounded-lg p-2.5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            selectedAnime ? "opacity-60 cursor-not-allowed" : ""
          }`}
        />

        {showDropdown && results.length > 0 && !selectedAnime && (
          <ul className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg max-h-60 overflow-auto shadow-lg">
            {results.map((anime) => (
              <li
                key={`${anime.source}-${anime.id}`}
                onClick={() => handleSelect(anime)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 cursor-pointer transition"
              >
                {anime.imageUrl && (
                  <img
                    src={anime.imageUrl}
                    alt={anime.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{anime.title}</p>
                  <p className="text-xs text-gray-400">
                    {anime.genres.join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {loading && <p className="text-xs text-gray-400 mt-1">Loading...</p>}
      </div>

      {/* Preview selected anime */}
      {selectedAnime && (
        <div className="mt-3 p-3 bg-gray-700 rounded-lg flex gap-3 items-start">
          {selectedAnime.imageUrl && (
            <img
              src={selectedAnime.imageUrl}
              alt={selectedAnime.title}
              className="w-20 h-28 object-cover rounded"
            />
          )}
          <div className="flex flex-col text-white">
            <p className="font-bold text-lg">{selectedAnime.title}</p>
            {selectedAnime.synopsis && (
              <p className="text-sm text-gray-300">
                Synopsis: {selectedAnime.synopsis}
              </p>
            )}
            {selectedAnime.genres && (
              <p className="text-sm text-gray-300">
                Genres: {selectedAnime.genres.join(", ")}
              </p>
            )}
            {selectedAnime.year && (
              <p className="text-sm text-gray-300">
                Season: {selectedAnime.year}
              </p>
            )}
            {selectedAnime.episodesCount && (
              <p className="text-sm text-gray-300">
                Episodes: {selectedAnime.episodesCount}
              </p>
            )}
            {selectedAnime.score && (
              <p className="text-sm text-gray-300">
                Score: {selectedAnime.score}
              </p>
            )}
            {selectedAnime.type && (
              <p className="text-sm text-gray-300">
                Type: {selectedAnime.type}
              </p>
            )}
            {selectedAnime.status && (
              <p className="text-sm text-gray-300">
                Status: {selectedAnime.status}
              </p>
            )}
            <p className="text-xs text-gray-400">
              Source: {selectedAnime.source}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-1 px-2 py-1 text-xs text-red-400 hover:text-red-500 transition self-start"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border hover:bg-gray-600 transition text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {editing ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
