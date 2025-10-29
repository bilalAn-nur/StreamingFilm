"use client";
import { Fragment, useEffect, useState } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  const handleClose = () => {
    // Trigger animation before unmount
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 200); // durasi sama dengan animasi
  };

  if (!isOpen && !show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Modal content */}
      <div
        className={`relative bg-gray-800 rounded-xl shadow-lg w-full max-w-md mx-4 p-4 transition-all transform ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {children({ close: handleClose })}
      </div>
    </div>
  );
}
