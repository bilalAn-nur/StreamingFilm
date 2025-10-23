// components/MoviesGrid.js
import Image from "next/image";

export default function MoviesGrid({ setHoveredMovie }) {
  const movies = [
    {
      src: "https://drive.google.com/uc?export=view&id=10vr5UZFDTLF02bSnztXKd0bd8VdwT3fZ",
      title: "UMA MUSUME: CINDERELLA GRAY",
      genres: ["Sports", "Slice of Life", "Comedy", "Drama", "Music"],
      year: 2021,
      episodes: 24,
      synopsis: "Follow the story of aspiring horse girls striving...",
    },
    {
      src: "/movies/movie1.jpg",
      title: "Movie 1",
      genres: ["Action", "Adventure"],
      year: 2023,
      episodes: 12,
      synopsis: "This is a synopsis of movie 1...",
    },
    // dst...
  ];
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
            <div className="relative w-full pt-[150%] rounded-lg overflow-hidden group">
              <Image
                src={movie.src}
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
