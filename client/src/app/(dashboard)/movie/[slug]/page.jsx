import MovieComponent from "@/components/dashboard/pages/MovieComponent";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Movie",
    description: "Halaman Movie",
  };
}
export default function Movie() {
  return <p>Hello</p>;
}
