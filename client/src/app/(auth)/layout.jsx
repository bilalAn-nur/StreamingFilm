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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#071033] p-10 box-border font-sans text-[#0f172a]">
      <div className="w-full max-w-sm bg-white rounded-xl p-7 shadow-[0_8px_30px_rgba(2,6,23,0.35),_inset_0_1px_0_rgba(255,255,255,0.6)]">
        <header className="text-center mb-[18px]">
          <div
            aria-hidden
            className="w-14 h-14 mx-auto mb-3 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl"
          >
            SI
          </div>
          <h1 className="m-0 text-[20px] font-semibold">{title}</h1>
        </header>

        <main>{children}</main>

        <footer className="mt-[18px] text-center text-xs text-slate-400">
          {type === "login" ? (
            <>
              <div>
                Don’t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-indigo-600 hover:underline"
                >
                  Sign-up
                </Link>{" "}
              </div>
              <div className="mt-2">
                Forgot Password? {""}
                <Link
                  className="text-indigo-600 hover:underline"
                  href="/forgot-password"
                >
                  Klik Here
                </Link>{" "}
              </div>
            </>
          ) : type === "register" ? (
            <div>
              Already have an account?{" "}
              <Link href="/sign-in" className="text-indigo-600 hover:underline">
                Sign in
              </Link>
            </div>
          ) : (
            <div>
              <Link href="/sign-in" className="text-indigo-600 hover:underline">
                Back To Sign in
              </Link>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
