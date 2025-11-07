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
    const res2 = await api.post("/anime", form);
    const res = await fetch(`${CONFIG.BASE_URL}/anime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(form),
    });
    console.log(res2);

    const text = await res.text();
    const data = JSON.parse(text);

    if (!res.ok) throw new Error(`Gagal submit: ${res.status} ${text}`);

    // Pastikan data baru berbentuk object
    const newMovie = Array.isArray(data.data) ? data.data[0] : data.data;

    // Update state
    setMovies((prev) => [newMovie, ...prev]);

    // Tutup modal
    close();
  } catch (err) {
    console.error("Error handleSubmitAnime:", err);
    alert("Gagal mengirim data. Lihat console untuk detail.");
  }
};
