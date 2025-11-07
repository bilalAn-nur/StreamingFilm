import CONFIG from "@/config";
import { NextResponse } from "next/server";

export const requireAuth = async (req) => {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (refreshToken) {
      const res = await fetch(
        `${CONFIG.BASE_URL_MIDDLEWARE}/token/verify-token`,
        {
          method: "POST",
          // credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken,
            refreshToken,
          }),
        }
      );
    }

    const res = await fetch(
      `${CONFIG.BASE_URL_MIDDLEWARE}/token/verify-token`,
      {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          refreshToken,
        }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      if (data.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    }
  } catch (err) {
    return NextResponse.next();
  }
};
