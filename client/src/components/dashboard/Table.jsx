"use client";

export default function Table({ data = [], columns = [], pagination }) {
  const {
    paginatedItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = pagination;

  return (
    <div className="overflow-x-auto w-full">
      {/* Desktop */}
      <div className="hidden md:block">
        <table className="min-w-full text-left text-white">
          <thead>
            <tr className="border-b border-gray-700/50 text-gray-300">
              {columns.map((col) => (
                <th key={col.accessor} className="pb-3 px-2 whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  className="border-t border-gray-700 hover:bg-gray-800/40"
                >
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      className="px-4 py-3 whitespace-nowrap"
                    >
                      {col.render
                        ? col.render(item[col.accessor], item)
                        : item[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {paginatedItems.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-md p-4"
          >
            {columns.map((col) => (
              <div
                key={col.accessor}
                className="flex justify-between text-sm text-gray-300"
              >
                <span className="font-medium">{col.header}:</span>
                <span>
                  {col.render
                    ? col.render(item[col.accessor], item)
                    : item[col.accessor]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center mt-4 text-gray-300 text-sm sm:flex-row sm:justify-center sm:gap-3">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded transition mb-2 sm:mb-0 ${
              currentPage === 1
                ? "bg-gray-700/50 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
            }`}
          >
            Prev
          </button>
          <span className="sm:hidden text-gray-400 mb-2">
            Page {currentPage} / {totalPages}
          </span>
          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 rounded ${
                      page === currentPage
                        ? "bg-red-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded transition ${
              currentPage === totalPages
                ? "bg-gray-700/50 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
