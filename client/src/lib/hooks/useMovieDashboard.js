import { useState, useEffect } from "react";
import useTable from "@/lib/hooks/useTable";
import api from "@/utils/axios";
import CONFIG from "@/config";

export default function useMovieDashboard(itemsPerPage = 10) {
  const [allMovies, setAllMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(getInitialForm());

  const filteredMovies = allMovies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase())
  );

  const pagination = useTable(filteredMovies, itemsPerPage);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await api.get("/anime");
        if (!res.status) throw new Error("Failed to fetch movies");
        setAllMovies(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMovies();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(getInitialForm());
    setIsOpen(true);
  };

  const openEdit = (movie) => {
    setEditing(movie);
    setForm({ ...movie });
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const addAnime = async (e, form, close, movies, setMovies) => {
    e.preventDefault();
    try {
      const res = await api.post("/anime", form);
      console.log(res);

      // const text = await res.text();
      // const data = JSON.parse(text);

      if (!res.status) throw new Error(`Gagal submit`);

      // Pastikan data baru berbentuk object
      const newMovie = Array.isArray(res.data.data)
        ? res.data.data[0]
        : res.data.data;

      // Update state
      setMovies((prev) => [newMovie, ...prev]);

      // Tutup modal
      close();
    } catch (err) {
      console.error("Error handleSubmitAnime:", err);
      alert("Gagal mengirim data. Lihat console untuk detail.");
    }
  };

  const handleDelete = (movieId) => {
    if (!confirm("Hapus movie ini?")) return;
    setAllMovies((prev) =>
      prev.filter((m) => m.id !== movieId && m._id !== movieId)
    );
  };

  return {
    allMovies,
    filteredMovies,
    setAllMovies,
    query,
    setQuery,
    isOpen,
    editing,
    form,
    setForm,
    openAdd,
    openEdit,
    closeModal,
    handleDelete,
    pagination,
    addAnime,
  };
}

function getInitialForm() {
  return {
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
  };
}
