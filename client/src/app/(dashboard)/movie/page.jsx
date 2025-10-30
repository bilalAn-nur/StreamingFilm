"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/dashboard/Modal";
import MovieForm from "@/components/dashboard/MovieForm";
import Table from "@/components/dashboard/Table";
import Input from "@/components/auth/Input";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
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

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  // Fetch movies dari backend
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("http://localhost:3001/api/v1/anime");
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data.data); // pastikan backend return array movie
      } catch (err) {
        console.error(err);
      }
    }
    fetchMovies();
  }, []);

  const openAdd = () => {
    setEditing(null);
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
    setIsOpen(true);
  };

  const openEdit = (movie) => {
    setEditing(movie);
    setForm({ ...movie });
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleDelete = (movieId) => {
    if (!confirm("Hapus movie ini?")) return;
    setMovies((prev) =>
      prev.filter((m) => m.id === movieId || m._id === movieId)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-red-500">
          INMA Movie
        </h1>
      </header>

      {/* Table */}
      <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm shadow-lg overflow-x-auto">
        {/* Table Header: search + add button */}
        <div className="flex justify-between items-center mb-4 gap-3">
          {/* Search Input di kiri */}
          <div className="flex-1 max-w-xs">
            <Input
              label="Search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movie..."
              className="w-full"
            />
          </div>

          {/* Tombol Add Movie di kanan */}
          <button
            onClick={openAdd}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
          >
            Add Movie
          </button>
        </div>

        <Table
          movies={filteredMovies}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        {({ close }) => (
          <>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-red-400">
                {editing ? "Edit Movie" : "Add Movie"}
              </h2>
              <button
                onClick={close}
                className="text-gray-300 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <MovieForm
              editing={editing}
              form={form}
              setForm={setForm}
              close={close}
              onCancel={closeModal}
              movies={movies}
              setMovies={setMovies}
            />
          </>
        )}
      </Modal>
    </div>
  );
}
