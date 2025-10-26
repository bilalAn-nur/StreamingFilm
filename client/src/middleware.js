import { requireAdmin } from "./middleware/admin";
import { requireAuth } from "./middleware/auth";
import { requireUser } from "./middleware/user";

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

  if (url.startsWith("/profile")) {
    return requireUser(req);
  }

  if (url.startsWith("/dashboard")) {
    return requireAdmin(req);
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
