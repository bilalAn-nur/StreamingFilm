"use client";

import { useEffect, useState } from "react";
import { BellIcon, SearchIcon } from "../icons/icon.jsx";
import { BASE_URL } from "@/config/index.js";

export default function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const refreshToken = await fetch(`${BASE_URL}/token/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ accessToken }),
          credentials: "include",
        });

        if (!refreshToken.ok) {
          throw new Error("Gagal mengambil data user");
        }

        const data = await refreshToken.json();
        const accessToken = data?.accessToken ?? null;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex justify-between items-center p-4 md:ml-64">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-sm text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-60"
        />
        <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
          <SearchIcon />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
          <BellIcon />
        </button>

        <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center font-bold">
          B
        </div>
      </div>
    </header>
  );
}
