import { requireAuth } from "./middleware/auth";
import { requireProfile } from "./middleware/profile";

export function middleware(req) {
  const url = req.nextUrl.pathname;
  if (url.startsWith("/sign-in") || url.startsWith("/sign-up")) {
    return requireAuth(req);
  }

  // halaman protected
  if (url.startsWith("/profile")) {
    return requireProfile(req);
  }
}

// Terapkan hanya ke route tertentu
export const config = {
  matcher: ["/sign-in", "/register", "/profile/:path*"],
};
