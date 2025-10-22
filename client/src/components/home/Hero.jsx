// components/Hero.js
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-[600px] ml-20 bg-black text-white">
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        className="object-cover opacity-80"
      />
      <div className="absolute top-1/4 left-16 max-w-lg">
        <h1 className="text-5xl font-bold mb-4">SAM AWAY</h1>
        <p className="text-gray-300 mb-4">
          Adventure, Fantasy | 2019 | 136 Min.
          <br />
          When a tornado hits through City of Peaceville, Samantha (Jenny
          Loifer) and her dog, Ricko, are whisked away in their house to an
          amazing journey.
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Director: Todd Burns
          <br />
          Cast: Jenny Loifer, Sarah Obrien, Larry Moss Jr.
        </p>
        <button className="bg-transparent border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
          Watch Now
        </button>
      </div>
    </div>
  );
}
