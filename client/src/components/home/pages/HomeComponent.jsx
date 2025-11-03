"use client";
import Hero from "@/components/home/Hero";
import Moviegrid from "@/components/home/Moviegrid";
import Sidebar from "@/components/home/Sidebar";
import { useState } from "react";

export const HomeComponent = () => {
  const [hoveredMovie, setHoveredMovie] = useState(null);
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Sidebar />

      {/* Hero menerima movie yang sedang di-hover */}
      <Hero hoveredMovie={hoveredMovie} />

      {/* MoviesGrid mengirim setHoveredMovie agar Hero bisa update */}
      <Moviegrid setHoveredMovie={setHoveredMovie} />
    </div>
  );
};
