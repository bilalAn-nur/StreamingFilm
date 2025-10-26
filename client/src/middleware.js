import { requireAuth } from "./middleware/auth";
import { requireProfile } from "./middleware/profile";

export function middleware(req) {
  const url = req.nextUrl.pathname;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (
    url.startsWith("/sign-in") ||
    url.startsWith("/sign-up") ||
    (url.startsWith("/forgot-password") && refreshToken)
  ) {
    return requireAuth(req);
  }

  if (url.startsWith("/profile") || url.startsWith("/dashboard")) {
    return requireProfile(req);
  }
}

// Terapkan hanya ke route tertentu
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/profile/:path*",
    "/dashboard/:path*",
  ],
};
