"use client";
import Modal from "@/components/dashboard/Modal";
import MovieForm from "@/components/dashboard/MovieForm";
import Table from "@/components/dashboard/Table";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", year: "", genre: "" });

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch("http://localhost:3001/api/v1/anime"); // ganti dengan endpoint backend-mu
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data.data); // data diharapkan array movie
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
    fetchMovies();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", year: "", genre: "" });
    setIsOpen(true);
  };

  const openEdit = (movie) => {
    setEditing(movie);
    setForm({ title: movie.title, year: movie.year, genre: movie.genre });
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editing) {
      setMovies((m) =>
        m.map((it) => (it.id === editing.id ? { ...it, ...form } : it))
      );
    } else {
      setMovies((m) => [...m, { id: Date.now(), ...form }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (!confirm("Hapus movie ini?")) return;
    setMovies((m) => m.filter((it) => it.id !== id));
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
        <div className="flex justify-end mb-4">
          <button
            onClick={openAdd}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
          >
            Add Movie
          </button>
        </div>
        <Table movies={movies} onEdit={openEdit} onDelete={handleDelete} />
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
                className="text-gray-300 hover:text-white transition"
              >
                ✕
              </button>
            </div>
            <MovieForm
              editing={editing}
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              onCancel={close}
            />
          </>
        )}
      </Modal>
    </div>
  );
}
