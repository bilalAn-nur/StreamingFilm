import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Sidebar />
      <Header />
      <main className="p-6 md:ml-64">{children}</main>
    </div>
  );
}
