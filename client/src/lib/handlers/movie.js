// lib/handlers/movie.js
export const fetchMergedAnime = async (query) => {
  try {
    const res = await fetch(
      `http://localhost:3001/api/v1/anime/merged?q=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error("Failed to fetch merged anime");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
export const handleSubmitAnime = async (e, form, close, movies, setMovies) => {
  e.preventDefault();

  console.log("Mengirim form:", form);

  try {
    const res = await fetch("http://localhost:3001/api/v1/anime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const text = await res.text(); // ambil mentah dulu supaya kalau JSON error tetap kelihatan
    console.log("Response raw:", text);

    if (!res.ok) throw new Error(`Gagal submit: ${res.status} ${text}`);

    const data = JSON.parse(text);
    console.log("Data berhasil dikirim:", data);

    // Update tabel langsung
    setMovies((prev) => [...prev, data.data]);

    // Tutup modal
    close();
  } catch (err) {
    console.error("Error handleSubmitAnime:", err);
    alert("Gagal mengirim data. Lihat console untuk detail.");
  }
};
