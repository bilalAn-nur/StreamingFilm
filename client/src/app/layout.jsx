"use client";

import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const type = pathname.includes("sign-in")
    ? "login"
    : pathname.includes("sign-up")
    ? "register"
    : "forgot";

  const title =
    type === "login"
      ? "Sign in to your account"
      : type === "register"
      ? "Create your account"
      : "Enter your email to reset";
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
