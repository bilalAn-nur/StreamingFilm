"use client";
import useMovie from "@/lib/hooks/useMovie";
import Image from "next/image";

export default function Hero({ hoveredMovie }) {
  const { movie, fade, mainImage } = useMovie(hoveredMovie);

  return (
    <div className="relative w-full md:ml-28 h-[600px] bg-black rounded-2xl overflow-hidden shadow-xl">
      {/* === Background Blur Layer === */}
      <div className="absolute inset-0">
        <Image
          src={mainImage}
          alt={movie.title}
          fill
          className={`object-cover blur-2xl scale-110 brightness-[0.35] transition-opacity duration-700 ease-in-out ${
            fade ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
      </div>

      {/* === Overlay Gradient === */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-700 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* === Main Content === */}
      <div className="relative flex flex-col md:flex-row items-center md:items-end h-full px-8 pb-12 z-10">
        {/* Poster */}
        <div
          className={`relative w-[220px] h-[320px] md:w-[280px] md:h-[400px] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-700 ${
            fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <Image
            src={mainImage}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text Container */}
        <div
          className={`mt-6 md:mt-0 md:ml-10 text-left transition-all duration-700 ${
            fade ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-4">
            {movie.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map((g) => (
              <span
                key={g}
                className="bg-gray-800/70 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-full uppercase"
              >
                {g}
              </span>
            ))}
            <span className="bg-red-600 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full">
              ⭐ {movie.score}
            </span>
            <span className="bg-gray-800/70 text-white text-xs md:text-sm font-medium px-3 py-1 rounded-full">
              {movie.episodesCount} Episodes
            </span>
          </div>

          <p className="text-gray-200 text-sm md:text-base mb-6 line-clamp-3 max-w-xl drop-shadow-md">
            {movie.synopsis}
          </p>

          <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 hover:bg-red-700 transition-transform duration-300 shadow-lg">
            ▶ Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
