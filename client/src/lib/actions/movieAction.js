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

    const newMovie = Array.isArray(res.data.data)
      ? res.data.data[0]
      : res.data.data;

    setMovies((prev) => [newMovie, ...prev]);
    close();
  } catch (err) {
    // TOKEN EXPIRED → server biasanya balikin 401
    if (err.status === 500 || err.status === 401) {
      try {
        // refresh token
        const refresh = await api.post(
          "/token/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = refresh.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // ulang submit setelah refresh
        const retry = await api.post("/anime", form, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });

        const newMovie = Array.isArray(retry.data.data)
          ? retry.data.data[0]
          : retry.data.data;

        setMovies((prev) => [newMovie, ...prev]);
        close();
        return;
      } catch (refreshErr) {
        console.error("Refresh token gagal:", refreshErr);
        alert("Sesi habis. Silahkan login ulang.");
        return;
      }
    } else {
      console.error("Error handleSubmitAnime:", err);
    }
  }
};
