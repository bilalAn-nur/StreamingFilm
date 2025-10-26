"use client";
import { useEffect } from "react";

export default function Notification({ message, type = "error", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const bgColor =
    type === "error"
      ? "bg-red-500"
      : type === "success"
      ? "bg-green-500"
      : "bg-gray-500";

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-md text-white shadow-lg ${bgColor} animate-slide-in`}
    >
      {message}
    </div>
  );
}
