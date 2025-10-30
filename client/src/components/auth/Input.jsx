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
      <Input
        label="Title"
        name="title"
        value={query}
        onChange={handleChange}
        error={null}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
