"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  UserIcon,
  SettingsIcon,
  InfoIcon,
  LogoutIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "../icons/icon.jsx";
import { handleSubmitLogout } from "@/lib/handlers/auth.js";

export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitLogout();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* Tombol utama */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-transparent text-white font-medium cursor-pointer select-none"
      >
        {/* Foto profil */}
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex items-center justify-center bg-gray-700">
          {user?.profilePicture ? (
            <Image
              src={user.profilePicture}
              alt={user.name || "User Avatar"}
              fill
              className="object-cover pointer-events-none"
              sizes="36px"
            />
          ) : user?.name ? (
            user.name[0].toUpperCase()
          ) : (
            "I"
          )}
        </div>

        {/* Teks & ikon panah */}
        <div className="flex items-center gap-1">
          {/* sembunyikan teks di mobile */}
          <span className="hidden md:inline">
            Hello, {user?.name?.split(" ")[0] || "User"}
          </span>
          {open ? (
            <ChevronUpIcon className="w-4 h-4 transition-transform duration-200" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 transition-transform duration-200" />
          )}
        </div>
      </button>

      {/* Dropdown dengan animasi CSS */}
      <div
        className={`absolute right-0 mt-2 w-56 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden transform transition-all duration-200 origin-top ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Header user */}
        <div className="px-4 py-3 border-b border-gray-700">
          <p className="font-semibold">{user?.name || "User Name"}</p>
          <p className="text-sm text-gray-400">
            {user?.email || "user@example.com"}
          </p>
        </div>

        {/* Menu options */}
        <ul className="flex flex-col py-1">
          <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition">
            <UserIcon className="w-5 h-5 text-gray-400" />
            Edit profile
          </li>
          <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition">
            <SettingsIcon className="w-5 h-5 text-gray-400" />
            Account settings
          </li>
          <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer transition">
            <InfoIcon className="w-5 h-5 text-gray-400" />
            Support
          </li>
        </ul>

        {/* Divider */}
        <div className="border-t border-gray-700 my-1"></div>

        {/* Logout */}
        <ul>
          <li
            className="px-4 py-2 flex items-center gap-2 hover:bg-red-700 cursor-pointer text-red-500 transition"
            onClick={handleSubmit}
          >
            <LogoutIcon className="w-5 h-5 text-red-500" />
            Sign out
          </li>
        </ul>
      </div>
    </div>
  );
}
