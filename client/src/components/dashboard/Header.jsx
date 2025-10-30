"use client";

import { useEffect, useState } from "react";
import { BarIcon, SearchIcon } from "../icons/icon.jsx";
import { BASE_URL } from "@/config/index.js";
import {
  getUser,
  refreshAndStoreAccessToken,
} from "@/lib/handlers/dashboard.js";
import ProfileDropdown from "./ProfileDropdown";
import NotificationDropdown from "./NotificationDropdown";

export default function Header({ onToggleSidebar, onLogout }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([
    "New comment on your post",
    "Server maintenance at 12:00",
    "Update available",
  ]);

  useEffect(() => {
    async function fetchUser() {
      try {
        await refreshAndStoreAccessToken(BASE_URL);
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
      {/* Kiri: Tombol Sidebar & Search (hanya tampil di desktop) */}
      <div className="flex items-center gap-3">
        {/* Tombol toggle sidebar */}
        <button
          className="md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          onClick={onToggleSidebar}
        >
          <BarIcon size={22} />
        </button>
      </div>

      {/* Kanan: Notifikasi dan Profile */}
      <div className="flex items-center gap-3">
        {/* Notifikasi tampil di kanan atas untuk semua ukuran layar */}
        <NotificationDropdown notifications={notifications} />

        {/* ProfileDropdown tanpa teks Hello di mobile */}
        <div className="flex items-center">
          <ProfileDropdown
            user={user}
            onLogout={onLogout}
            hideHelloOnMobile={true}
          />
        </div>
      </div>
    </header>
  );
}
