"use client";
import { handleSubmitLogout } from "@/lib/handlers/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashboardIcon,
  LogoutIcon,
  MovieIcon,
  SettingsIcon,
  UploadIcon,
  UserIcon,
} from "../icons/icon.jsx";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <DashboardIcon /> },
    { name: "Movies", href: "/movie", icon: <MovieIcon /> },
    { name: "Upload", href: "/upload", icon: <UploadIcon /> },
    { name: "Users", href: "/users", icon: <UserIcon /> },
    { name: "Settings", href: "/settings", icon: <SettingsIcon /> },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSubmitLogout();
  };

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-gray-300 border-r border-gray-800 flex flex-col p-6 transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0`}
      >
        <div className="text-2xl font-extrabold text-red-500 mb-10 text-center">
          INMA ADMIN
        </div>

        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                pathname === link.href
                  ? "bg-red-600 text-white"
                  : "hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-800">
          <button
            className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition"
            onClick={handleSubmit}
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
}
