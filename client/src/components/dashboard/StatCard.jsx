export default function StatCard({ icon, label, value }) {
  return (
    <div className="bg-gray-800/80 p-4 rounded-xl flex flex-col items-start shadow-md hover:shadow-lg transition">
      <div className="text-red-500 mb-2">{icon}</div>
      <p className="text-sm text-gray-400">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
