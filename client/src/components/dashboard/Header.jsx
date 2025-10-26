"use client";

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
          {/* <Search size={18} /> */}
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
          {/* <Bell size={18} /> */}
        </button>
        <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center font-bold">
          B
        </div>
      </div>
    </header>
  );
}
