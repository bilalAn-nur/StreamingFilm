"use client";

import useAnimeSearch from "@/lib/hooks/useAnimeSearch";
import useMovieDashboard from "@/lib/hooks/useMovieDashboard";

export default function MovieForm({
  editing,
  form,
  setForm,
  onCancel,
  close,
  movies,
  setMovies,
}) {
  const {
    query,
    results,
    loading,
    showDropdown,
    selectedAnime,
    handleChange,
    handleSelect,
    handleReset,
    setShowDropdown,
  } = useAnimeSearch(form, setForm);

  const { addAnime } = useMovieDashboard();

  return (
    <form
      onSubmit={(e) => addAnime(e, form, close, movies, setMovies)}
      className="p-4 space-y-6 bg-gray-800 rounded-xl shadow-lg"
    >
      {/* Input Title */}

      <div className="relative w-full">
        <label className="block text-sm font-semibold mb-2 text-gray-200">
          Title
        </label>
        <div className="relative w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => !selectedAnime && setShowDropdown(true)}
            placeholder="Search anime..."
            disabled={!!selectedAnime}
            className="w-full rounded-lg p-2.5 pr-10 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
          />
          {loading && (
            <div className="absolute right-3 top-0 bottom-0 flex items-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && !selectedAnime && (
          <ul className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl max-h-64 overflow-auto shadow-2xl">
            {loading ? (
              <li className="p-3 text-center text-gray-400">Loading...</li>
            ) : results.length === 0 ? (
              <li className="p-3 text-center text-gray-400">
                Anime with the title "{query}" was not found.
              </li>
            ) : (
              results.map((anime) => (
                <li
                  key={anime.mal_id || anime.kitsu_io_id || anime.title}
                  onClick={() => handleSelect(anime, setForm)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-indigo-600 hover:text-white cursor-pointer transition-all duration-200 rounded-lg"
                >
                  {anime.imageUrl && (
                    <img
                      src={anime.imageUrl}
                      alt={anime.title}
                      className="w-12 h-16 object-cover rounded-lg shadow-md"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{anime.title}</p>
                    <p className="text-xs text-gray-400">
                      {(anime.genres || []).join(", ")}
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Preview */}
      {selectedAnime && (
        <div className="mt-4 p-4 bg-gray-700 rounded-xl flex gap-4 items-start shadow-lg animate-fadeIn">
          {selectedAnime.imageUrl && (
            <img
              src={selectedAnime.imageUrl}
              alt={selectedAnime.title}
              className="w-24 h-32 object-cover rounded-lg shadow-md"
            />
          )}
          <div className="flex flex-col text-white">
            <p className="font-bold text-xl">{selectedAnime.title}</p>
            {selectedAnime.genres && (
              <p className="text-sm text-gray-300 mt-1">
                <span className="font-semibold">Genres:</span>{" "}
                {selectedAnime.genres.join(", ")}
              </p>
            )}
            {selectedAnime.year && (
              <p className="text-sm text-gray-300 mt-1">
                <span className="font-semibold">Season:</span>{" "}
                {selectedAnime.year}
              </p>
            )}
            {selectedAnime.episodesCount && (
              <p className="text-sm text-gray-300 mt-1">
                <span className="font-semibold">Episodes:</span>{" "}
                {selectedAnime.episodesCount}
              </p>
            )}
            <button
              type="button"
              onClick={() => handleReset(setForm)}
              className="mt-2 px-3 py-1 text-xs text-red-400 hover:text-red-500 transition self-start rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border border-gray-500 text-white rounded-xl hover:bg-gray-600 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 cursor-pointer"
        >
          {editing ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
