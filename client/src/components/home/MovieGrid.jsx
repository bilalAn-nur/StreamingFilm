// components/MoviesGrid.js
import Image from "next/image";

const movies = [
  "/movies/movie1.jpg",
  "/movies/movie2.jpg",
  "/movies/movie3.jpg",
  "/movies/movie4.jpg",
  "/movies/movie5.jpg",
  "/movies/movie6.jpg",
  "/movies/movie7.jpg",
  "/movies/movie8.jpg",
  "/movies/movie9.jpg",
  "/movies/movie10.jpg",
];

export default function MoviesGrid() {
  return (
    <div className="ml-20 p-8">
      <h2 className="text-2xl font-bold mb-4">Recently Added Films</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="relative cursor-pointer group">
            <Image
              src={movie}
              alt={`Movie ${index}`}
              width={200}
              height={300}
              className="rounded-lg transform group-hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
