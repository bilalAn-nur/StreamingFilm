"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Movies", href: "/dashboard/movies" },
    { name: "Upload", href: "/dashboard/upload" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-gray-300 h-screen fixed left-0 top-0 p-6 border-r border-gray-800">
      <div className="text-2xl font-extrabold text-red-500 mb-10 text-center">
        INFI ADMIN
      </div>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
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
        <button className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition">
          {/* <LogOut size={18} /> */}
          Logout
        </button>
      </div>
    </aside>
  );
}
