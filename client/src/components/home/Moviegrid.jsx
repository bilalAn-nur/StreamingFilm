"use client";
import Image from "next/image";
import useMovie from "@/lib/hooks/useMovie";

export default function MoviesGrid({ setHoveredMovie }) {
  const { movies, loading, error } = useMovie();

  if (loading) return <p className="text-white p-8">Loading movies...</p>;
  if (error) return <p className="text-red-500 p-8">Error: {error}</p>;

  return (
    <div className="md:ml-28 p-8">
      <h2 className="text-2xl font-bold mb-4">Recently Added Films</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="relative cursor-pointer group overflow-hidden rounded-lg bg-black"
            onMouseEnter={() => setHoveredMovie(movie)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <div className="relative w-full pt-[150%] rounded-lg overflow-hidden">
              <Image
                src={movie.imageUrl}
                alt={movie.title}
                fill
                className="object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
