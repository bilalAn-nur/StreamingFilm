"use client";
import { useState } from "react";
import Hero from "@/components/home/Hero";
import MoviesGrid from "@/components/home/MovieGrid";
import Sidebar from "@/components/home/Sidebar";

export default function Home() {
  const [hoveredMovie, setHoveredMovie] = useState(null);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Sidebar />

      {/* Hero menerima movie yang sedang di-hover */}
      <Hero hoveredMovie={hoveredMovie} />

      {/* MoviesGrid mengirim setHoveredMovie agar Hero bisa update */}
      <MoviesGrid setHoveredMovie={setHoveredMovie} />
    </div>
  );
}
