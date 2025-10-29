"use client";

export default function Table({ movies, onEdit, onDelete }) {
  return (
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
        {movies.map((movie) => (
          <tr
            key={movie.id}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <td className="px-4 py-3">{movie.title}</td>
            <td className="px-4 py-3">{movie.type}</td>
            <td className="px-4 py-3">{movie.Status}</td>
            <td className="px-4 py-3 w-28">{movie.Score}</td>
            <td className="px-4 py-3 w-40">{movie.genre}</td>
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
  );
}
