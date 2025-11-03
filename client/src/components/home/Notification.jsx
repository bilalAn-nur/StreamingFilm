"use client";

export default function Notification({ notification, onClose }) {
  if (!notification) return null;

  const { message, type } = notification;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-md text-white shadow-lg ${
        type === "success"
          ? "bg-green-500"
          : type === "error"
          ? "bg-red-500"
          : "bg-gray-500"
      } animate-slide-in`}
    >
      {message}
      <button
        onClick={onClose}
        className="ml-3 font-bold hover:opacity-80 transition"
      >
        ×
      </button>
    </div>
  );
}
