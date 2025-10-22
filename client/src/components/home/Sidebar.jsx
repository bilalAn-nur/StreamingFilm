import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white w-20 flex flex-col items-center py-6 space-y-6 fixed h-screen">
      <h1 className="text-red-600 font-bold text-xl">INDI</h1>
      <div className="space-y-6 mt-10">
        {/* Home Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0L5 10v10h14V10l-7-7z"
          />
        </svg>

        {/* Search Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16a8 8 0 1116 0 8 8 0 01-16 0zm8-8a8 8 0 10-8 8 8 8 0 008-8zm-3 7l4 4"
          />
        </svg>

        {/* Collection Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>

        {/* Star Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.15 6.607a1 1 0 00.95.69h6.955c.969 0 1.371 1.24.588 1.81l-5.64 4.107a1 1 0 00-.364 1.118l2.15 6.607c.3.921-.755 1.688-1.54 1.118l-5.64-4.107a1 1 0 00-1.175 0l-5.64 4.107c-.785.57-1.84-.197-1.54-1.118l2.15-6.607a1 1 0 00-.364-1.118L2.406 11.044c-.783-.57-.38-1.81.588-1.81h6.955a1 1 0 00.95-.69l2.15-6.607z"
          />
        </svg>

        {/* User Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer hover:text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A8.001 8.001 0 1112 20a8.001 8.001 0 01-6.879-2.196zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;
