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

  // Ambil data anime dari backend
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

  // Search Jikan saat query berubah
  useEffect(() => {
    if (!query.trim() || selectedAnime) return setResults([]);
    const timer = setTimeout(() => searchJikan(query), 400);
    return () => clearTimeout(timer);
  }, [query, selectedAnime]);

  // 1️⃣ Cari anime dari Jikan
  async function searchJikan(q) {
    setLoading(true);
    try {
      const jikanRes = await fetch(
        `https://api.jikan.moe/v4/anime?q=${q}&limit=10`
      ).then((r) => r.json());

      // Filter anime yang sudah ada
      const filtered = jikanRes.data.filter(
        (anime) =>
          !existingMovies.some((m) => anime.mal_id && m.mal_id === anime.mal_id)
      );

      setResults(filtered);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // 2️⃣ Ambil data Kitsu saat anime dipilih
  async function fetchMatchingKitsu(jikanItem) {
    try {
      const kitsuRes = await fetch(
        `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
          jikanItem.title
        )}&page[limit]=10`
      ).then((r) => r.json());
      console.log(kitsuRes);

      const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, "");

      const jikanTitles = [
        jikanItem.titles?.Default,
        jikanItem.titles?.English,
        jikanItem.titles?.Japanese,
      ]
        .filter(Boolean)
        .map(normalize);

      const matchingKitsu = kitsuRes.data.find((k) => {
        const kitsuTitles = [
          k.attributes.canonicalTitle,
          k.attributes.titles.en,
          k.attributes.titles.en_jp,
          k.attributes.titles.ja_jp,
        ]
          .filter(Boolean)
          .map(normalize);

        return jikanTitles.some((jt) => kitsuTitles.includes(jt));
      });

      console.log(matchingKitsu);
      return matchingKitsu || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // 3️⃣ Gabungkan data saat anime dipilih
  const handleSelect = async (jikanItem) => {
    setLoading(true);
    try {
      const kitsuRes = await fetch(
        `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
          jikanItem.title
        )}&page[limit]=1`
      ).then((r) => r.json());

      const kitsu = kitsuRes.data[0];

      const mergedAnime = {
        title: jikanItem.titles?.Default || jikanItem.title,
        genres: jikanItem.genres?.map((g) => g.name) || [],
        year: jikanItem.season
          ? `${jikanItem.season} ${jikanItem.year || ""}`
          : "",
        episodesCount:
          kitsu?.attributes.episodeCount || jikanItem.episodes || 0,
        imageUrl:
          kitsu?.attributes.posterImage?.small ||
          jikanItem.images?.jpg?.image_url ||
          "",
        bannerUrl:
          kitsu?.attributes.coverImage?.original ||
          jikanItem.images?.jpg?.large_image_url ||
          "",
        synopsis:
          kitsu?.attributes.synopsis ||
          kitsu?.attributes.description ||
          jikanItem.synopsis ||
          "",
        type: jikanItem.type || kitsu?.attributes.showType || "",
        status: jikanItem.status || kitsu?.attributes.status || "",
        score: jikanItem.score || kitsu?.attributes.averageRating || null,
        mal_id: jikanItem.mal_id,
        kitsu_io_id: kitsu?.id || null,
      };

      setForm(mergedAnime);
      setSelectedAnime(mergedAnime);
      setQuery(mergedAnime.title);
      setShowDropdown(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Data yang dikirim:", form);
        if (onSubmit) onSubmit(e);
      }}
      className="p-4 space-y-4"
    >
      {/* Input */}
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

        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        {showDropdown && results.length > 0 && !selectedAnime && (
          <ul className="absolute z-50 mt-1 w-full bg-gray-800 border border-gray-600 rounded-lg max-h-60 overflow-auto shadow-lg">
            {results.map((anime) => (
              <li
                key={anime.mal_id}
                onClick={() => handleSelect(anime)}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 cursor-pointer transition"
              >
                {anime.images?.jpg?.image_url && (
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{anime.title}</p>
                  <p className="text-xs text-gray-400">
                    {anime.genres?.map((g) => g.name).join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Preview */}
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
                Genres: {selectedAnime.genres}
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
