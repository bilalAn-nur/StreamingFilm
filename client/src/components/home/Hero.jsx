import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero({ hoveredMovie }) {
  const recomendasiMovie = {
    src: "https://drive.google.com/uc?export=view&id=10vr5UZFDTLF02bSnztXKd0bd8VdwT3fZ",
    title: "UMA MUSUME: CINDERELLA GRAY",
    genres: ["Sports", "Slice of Life", "Comedy", "Drama", "Music"],
    year: 2021,
    episodes: 24,
    synopsis:
      "Follow the story of aspiring horse girls striving Follow the story of aspiring horse girls strivingFollow the story of aspiring horse girls strivingFollow the story of aspiring horse girls strivingFollow the story of aspiring horse girls strivingFollow the story of aspiring horse girls striving",
  };

  const [movie, setMovie] = useState(recomendasiMovie);

  const [fade, setFade] = useState(false);

  useEffect(() => {
    const targetMovie = hoveredMovie || recomendasiMovie; // fallback ke default
    setFade(true); // start fade out
    const timeout = setTimeout(() => {
      setMovie(targetMovie); // ganti movie
      setFade(false); // fade in
    }, 500); // durasi fade out = 500ms
    return () => clearTimeout(timeout);
  }, [hoveredMovie]);

  return (
    <div className="relative w-full md:ml-28 h-[600px] bg-black rounded-lg overflow-hidden">
      {/* Hero Image */}
      <Image
        src={movie.src}
        alt={movie.title}
        fill
        className={`object-cover transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      ></div>

      {/* Text Container */}
      <div
        className={`absolute top-1/4 left-16 right-16 max-w-full md:max-w-lg p-6 rounded-lg bg-black/40 backdrop-blur-sm transition-all duration-700 ease-in-out ${
          fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
          {movie.title}
        </h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genres.map((g) => (
            <span
              key={g}
              className="bg-gray-600 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full uppercase"
            >
              {g}
            </span>
          ))}
          <span className="bg-gray-800/70 text-white text-xs md:text-sm font-medium px-3 py-1 rounded-full">
            {movie.year}
          </span>
          <span className="bg-gray-800/70 text-white text-xs md:text-sm font-medium px-3 py-1 rounded-full">
            {movie.episodes} Episodes
          </span>
        </div>
        <p className="text-gray-200 text-sm md:text-base mb-6 line-clamp-3 drop-shadow-md">
          {movie.synopsis}
        </p>
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-300">
          Watch Now
        </button>
      </div>
    </div>
  );
}
