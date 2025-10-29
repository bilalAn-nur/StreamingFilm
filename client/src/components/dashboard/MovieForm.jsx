"use client";

import Input from "../auth/Input";

export default function MovieForm({
  editing,
  form,
  setForm,
  onSubmit,
  onCancel,
}) {
  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  return (
    <form onSubmit={onSubmit} className="p-4 space-y-4">
      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <Input
        label="Year"
        name="year"
        value={form.year}
        onChange={handleChange}
      />
      <Input
        label="Genre"
        name="genre"
        value={form.genre}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border hover:bg-gray-600 transition text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {editing ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
