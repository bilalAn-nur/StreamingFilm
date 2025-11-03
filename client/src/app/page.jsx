import { HomeComponent } from "@/components/home/pages/HomeComponent";

export async function generateMetadata() {
  return {
    title: "Homepage",
    description: "Halaman Utama",
  };
}
export default function Home() {
  return <HomeComponent />;
}
