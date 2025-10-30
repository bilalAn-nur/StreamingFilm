"use client";

import { useState } from "react";

export default function Table({ movies, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // Hitung total halaman
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  // Ambil movies yang ditampilkan pada page ini
  const paginatedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <table className="min-w-full text-left text-white">
        <thead>
          <tr className="border-b border-gray-700/50 text-gray-300">
            <th className="pb-3 px-2">Title</th>
            <th className="pb-3 px-2">Type</th>
            <th className="pb-3 px-2">Status</th>
            <th className="pb-3 px-2">Score</th>
            <th className="pb-3 px-2">Genre</th>
            <th className="pb-3 px-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 && (
            <tr>
              <td
                colSpan="6"
                className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No movies yet.
              </td>
            </tr>
          )}
          {movies.map((movie, idx) => (
            <tr
              key={movie._id || movie.mal_id || movie.kitsu_io_id || idx}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <td className="px-4 py-3">{movie.title}</td>
              <td className="px-4 py-3">{movie.type}</td>
              <td className="px-4 py-3">{movie.status}</td>
              <td className="px-4 py-3 w-28">{movie.score}</td>
              <td className="px-4 py-3 w-40">
                {(movie.genres || []).join(", ")}
              </td>
              <td className="px-4 py-3 w-44">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(movie)}
                    className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:opacity-90 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(movie.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:opacity-90 transition"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 text-gray-300">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-700/50 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Tampilkan page secara compact: 1,2,3...last-2,last-1,last
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
                      : "bg-gray-700 hover:bg-gray-600"
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

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded  ${
              currentPage === totalPages
                ? "bg-gray-700/50 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
