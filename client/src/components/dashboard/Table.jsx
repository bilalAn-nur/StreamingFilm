"use client";

import { useState } from "react";

export default function Table({ movies, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const paginatedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handlePageClick = (page) => setCurrentPage(page);

  return (
    <div className="overflow-x-auto w-full">
      {/* 📊 Tampilan Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-left text-white">
          <thead>
            <tr className="border-b border-gray-700/50 text-gray-300">
              <th className="pb-3 px-2 whitespace-nowrap">Poster</th>
              <th className="pb-3 px-2 whitespace-nowrap">Title</th>
              <th className="pb-3 px-2 whitespace-nowrap">Type</th>
              <th className="pb-3 px-2 whitespace-nowrap">Status</th>
              <th className="pb-3 px-2 whitespace-nowrap">Score</th>
              <th className="pb-3 px-2 whitespace-nowrap">Genre</th>
              <th className="pb-3 px-2 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No movies yet.
                </td>
              </tr>
            ) : (
              paginatedMovies.map((movie, idx) => (
                <tr
                  key={movie._id || movie.id || idx}
                  className="border-t border-gray-700 hover:bg-gray-800/40"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {movie.imageUrl ? (
                      <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gray-700 rounded-md" />
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{movie.title}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{movie.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {movie.status}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{movie.score}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {(movie.genres || []).join(", ")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap w-44">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(movie)}
                        className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:opacity-90 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(movie._id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:opacity-90 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Tampilan Mobile */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {paginatedMovies.length === 0 ? (
          <div className="text-center text-gray-400 py-6">No movies yet.</div>
        ) : (
          paginatedMovies.map((movie) => (
            <div
              key={movie._id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
            >
              {/* Gambar anime */}
              {movie.imageUrl ? (
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-700" />
              )}

              {/* Isi info anime */}
              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-semibold text-base line-clamp-2">
                    {movie.title}
                  </h3>
                  <span className="text-xs text-gray-400">{movie.type}</span>
                </div>

                <p className="text-gray-300 text-sm">
                  <span className="font-medium">Status:</span> {movie.status}
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="font-medium">Score:</span> {movie.score}
                </p>
                <p className="text-gray-300 text-sm">
                  <span className="font-medium">Genres:</span>{" "}
                  {(movie.genres || []).join(", ")}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => onEdit(movie)}
                    className="flex-1 px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:opacity-90 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(movie._id)}
                    className="flex-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:opacity-90 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔢 Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center mt-4 text-gray-300 text-sm sm:flex-row sm:justify-center sm:gap-3">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded transition mb-2 sm:mb-0 ${
              currentPage === 1
                ? "bg-gray-700/50 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
            }`}
          >
            Prev
          </button>

          <span className="sm:hidden text-gray-400 mb-2">
            Page {currentPage} / {totalPages}
          </span>

          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded transition ${
              currentPage === totalPages
                ? "bg-gray-700/50 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
