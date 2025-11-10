export default function Notification({ message, type = "success", onClose }) {
  if (!message) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow-lg text-white ${bgColor} animate-fadeIn`}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white font-bold hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
}
