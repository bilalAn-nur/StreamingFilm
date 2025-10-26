"use client";

import { BellIcon, SearchIcon } from "../icons/icon.jsx";

export default function Header() {
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
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
          </svg> */}
        </button>
        <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center font-bold">
          B
        </div>
      </div>
    </header>
  );
}
