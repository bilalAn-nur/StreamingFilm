"use client";

import { useEffect, useState } from "react";
import { BarIcon, BellIcon, SearchIcon } from "../icons/icon.jsx";
import { BASE_URL } from "@/config/index.js";
import {
  getUser,
  refreshAndStoreAccessToken,
} from "@/lib/handlers/dashboard.js";
import Image from "next/image.js";

export default function Header({ onToggleSidebar }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = await refreshAndStoreAccessToken(BASE_URL);
        if (!token) {
          console.warn("Server tidak mengembalikan accessToken pada response.");
        } else {
          console.log("Access token diperbarui.");
        }
        const data = await getUser();
        setUser(data?.user || null);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex justify-between items-center p-4">
      {/* Tombol Menu (mobile only) */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          onClick={onToggleSidebar}
        >
          <BarIcon size={22} />
        </button>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 text-sm text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-48 sm:w-60"
          />
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
            <SearchIcon />
          </button>
        </div>
      </div>

      {/* Bagian kanan header */}
      <div className="flex items-center gap-4">
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
          <BellIcon />
        </button>

        {user?.profilePicture ? (
          <div className="w-9 h-9 rounded-full overflow-hidden relative">
            <Image
              src={user.profilePicture}
              alt={user.name || "User Avatar"}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
        ) : (
          <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center font-bold text-white">
            {user?.name ? user.name[0].toUpperCase() : "I"}
          </div>
        )}
      </div>
    </header>
  );
}
