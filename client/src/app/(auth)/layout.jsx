"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }) {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-10 box-border font-sans text-[#f1f1f1]">
      <div className="w-full max-w-sm bg-gray-800 rounded-xl p-7 shadow-[0_8px_30px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)]">
        <header className="text-center mb-[18px]">
          <div
            aria-hidden
            className="w-14 h-14 mx-auto mb-3 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xl"
          >
            INFI
          </div>
          <h1 className="m-0 text-[20px] font-semibold">{title}</h1>
        </header>

        <main>{children}</main>

        <footer className="mt-[18px] text-center text-xs text-gray-400 space-y-2">
          {type === "login" ? (
            <>
              <div>
                Don’t have an account?{" "}
                <Link href="/sign-up" className="text-red-500 hover:underline">
                  Sign-up
                </Link>{" "}
              </div>
              <div>
                Forgot Password?{" "}
                <Link
                  className="text-red-500 hover:underline"
                  href="/forgot-password"
                >
                  Klik Here
                </Link>{" "}
              </div>
            </>
          ) : type === "register" ? (
            <div>
              Already have an account?{" "}
              <Link href="/sign-in" className="text-red-500 hover:underline">
                Sign in
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/sign-in" className="text-red-500 hover:underline">
                Back To Sign in
              </Link>
            </div>
          )}

          {/* Back to Home */}
          <div>
            <Link href="/" className="text-red-500 hover:underline">
              &larr; Back to Home
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
