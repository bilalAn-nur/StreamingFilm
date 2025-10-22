import AuthForm from "@/components/AuthForm";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Sign-in",
    description: "Halaman Sign-in",
  };
}

export default function LoginPage() {
  return <AuthForm type="login" />;
}
