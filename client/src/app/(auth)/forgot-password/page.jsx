import AuthForm from "@/components/auth/pages/AuthForm";

export async function generateMetadata({ params, searchParams }) {
  return {
    title: "Forgot Password",
    description: "Halaman Lupa Kata Sandi",
  };
}

export default function SignInPage() {
  return <AuthForm type="forgot" />;
}
