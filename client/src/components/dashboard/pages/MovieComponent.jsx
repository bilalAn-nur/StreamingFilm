"use client";

import Input from "@/components/auth/Input";
import Table from "../Table";
import Modal from "@/components/dashboard/Modal";
import MovieForm from "@/components/dashboard/MovieForm";
import useMovieDashboard from "@/lib/hooks/useMovieDashboard";

export default function MovieComponent() {
  const {
    filteredMovies,
    allMovies,
    setAllMovies,
    query,
    setQuery,
    isOpen,
    editing,
    form,
    setForm,
    openAdd,
    openEdit,
    closeModal,
    handleDelete,
    pagination,
  } = useMovieDashboard(10);

  const columns = [
    {
      header: "Poster",
      accessor: "imageUrl",
      render: (val) =>
        val ? (
          <img src={val} className="w-12 h-16 object-cover rounded-md" />
        ) : (
          <div className="w-12 h-16 bg-gray-700 rounded-md" />
        ),
    },
    { header: "Title", accessor: "title" },
    { header: "Type", accessor: "type" },
    { header: "Status", accessor: "status" },
    { header: "Score", accessor: "score" },
    {
      header: "Genres",
      accessor: "genres",
      render: (val) => (val || []).join(", "),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (_, item) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(item)}
            className="px-3 py-1 text-sm bg-yellow-400 text-white rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(item._id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans p-8">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide text-red-500">
          INMA Movie
        </h1>
      </header>

      <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm shadow-lg overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
          <div className="flex-1 max-w-xs w-full order-2 md:order-1">
            <Input
              label="Search"
              name="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movie..."
              className="w-full"
            />
          </div>
          <button
            onClick={openAdd}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition cursor-pointer order-1 md:order-2"
          >
            Add Movie
          </button>
        </div>

        <Table
          data={pagination.paginatedItems}
          columns={columns}
          pagination={pagination}
        />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {({ close }) => (
          <>
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-red-400">
                {editing ? "Edit Movie" : "Add Movie"}
              </h2>
              <button
                onClick={close}
                className="text-gray-300 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <MovieForm
              editing={editing}
              form={form}
              setForm={setForm}
              close={close}
              onCancel={closeModal}
              movies={allMovies}
              setMovies={setAllMovies}
            />
          </>
        )}
      </Modal>
    </div>
  );
}
