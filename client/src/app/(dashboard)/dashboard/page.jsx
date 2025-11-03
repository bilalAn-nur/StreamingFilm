import DashboardComponent from "@/components/dashboard/pages/DashboardComponent";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Dashboard",
    description: "Halaman Dashboard",
  };
}
export default function Dashboard() {
  return <DashboardComponent />;
}
