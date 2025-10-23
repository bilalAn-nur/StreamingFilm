import Hero from "@/components/home/Hero";
import MoviesGrid from "@/components/home/MovieGrid";
import Sidebar from "@/components/home/Sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      <Sidebar />
      <Hero />
      <MoviesGrid />
    </div>
  );
}
