import CONFIG from "@/config";
import api from "@/utils/axios";

// lib/handlers/movie.js
const token =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

export const fetchMergedAnime = async (query) => {
  try {
    const res = await fetch(
      `${CONFIG.BASE_URL}/anime/merged?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    if (!res.ok) return err;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const handleSubmitAnime = async (e, form, close, movies, setMovies) => {
  e.preventDefault();
  try {
    const res = await api.post("/anime", form);

    if (!res.status) throw new Error(`Gagal submit: ${res.status} ${text}`);

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
