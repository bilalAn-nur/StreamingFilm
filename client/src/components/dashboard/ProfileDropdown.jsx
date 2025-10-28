"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  UserIcon,
  SettingsIcon,
  InfoIcon,
  LogoutIcon,
} from "../icons/icon.jsx";

export default function ProfileDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

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
      <button
        className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center  text-white font-bold"
        onClick={() => setOpen(!open)}
      >
        {user?.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt={user.name || "User Avatar"}
            fill
            className="object-cover"
            sizes="36px"
          />
        ) : user?.name ? (
          user.name[0].toUpperCase()
        ) : (
          "I"
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg z-50">
          {/* Header user */}
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="font-semibold">{user?.name || "User Name"}</p>
            <p className="text-sm text-gray-400">
              {user?.email || "user@example.com"}
            </p>
          </div>

          {/* Menu options */}
          <ul className="flex flex-col py-1">
            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer">
              <UserIcon className="w-5 h-5 text-gray-400" />
              Edit profile
            </li>
            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer">
              <SettingsIcon className="w-5 h-5 text-gray-400" />
              Account settings
            </li>
            <li className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer">
              <InfoIcon className="w-5 h-5 text-gray-400" />
              Support
            </li>
          </ul>

          {/* Divider */}
          <div className="border-t border-gray-700 my-1"></div>

          {/* Logout */}
          <ul>
            <li
              className="px-4 py-2 flex items-center gap-2 hover:bg-red-700 cursor-pointer text-red-500"
              onClick={onLogout}
            >
              <LogoutIcon className="w-5 h-5 text-red-500" />
              Sign out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
