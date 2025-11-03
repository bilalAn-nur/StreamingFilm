import AuthForm from "@/components/auth/pages/AuthForm";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Sign-in",
    description: "Halaman Sign-in",
  };
}

export default function SignUnPage() {
  return <AuthForm type="signup" />;
}
