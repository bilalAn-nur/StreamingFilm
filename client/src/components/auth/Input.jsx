"use client";
import React from "react";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium mb-1 text-white"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg p-2.5 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "border border-gray-600 focus:ring-red-600"
        }`}
        placeholder={`Enter your ${label.toLowerCase()}`}
        required
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
