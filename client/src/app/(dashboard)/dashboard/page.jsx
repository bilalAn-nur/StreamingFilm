"use client";
import { useState } from "react";

export default function Dashboard() {
  const [movies, setMovies] = useState([
    {
      title: "Uma Musume: Cinderella Gray",
      type: "series",
      year: 2021,
      genre: ["Sports", "Slice of Life"],
      episodes: 24,
    },
    {
      title: "Your Name",
      type: "movie",
      year: 2016,
      genre: ["Romance", "Drama"],
      episodes: 1,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-red-500">
          INFI Dashboard
        </h1>
        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition">
          {/* <Upload className="w-5 h-5" /> */}
          Upload Movie
        </button>
      </header>

      {/* Statistic Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Films" value={movies.length} />
        <StatCard label="Total Episodes" value="25" />
        <StatCard label="Active Users" value="1.2K" />
        <StatCard label="Uploads Today" value="3" />
      </div>

      {/* Movie Table */}
      <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-red-400">Movie List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-3">Title</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Year</th>
                <th className="pb-3">Genres</th>
                <th className="pb-3 text-center">Episodes</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition"
                >
                  <td className="py-3">{m.title}</td>
                  <td className="capitalize">{m.type}</td>
                  <td>{m.year}</td>
                  <td>{m.genre.join(", ")}</td>
                  <td className="text-center">{m.episodes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-gray-800/80 p-4 rounded-xl flex flex-col items-start shadow-md hover:shadow-lg transition">
      <div className="text-red-500 mb-2">{icon}</div>
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
