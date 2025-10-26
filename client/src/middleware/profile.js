import { BASE_URL } from "@/config";
import { NextResponse } from "next/server";

export const requireProfile = async (req) => {
  let accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Tidak ada token sama sekali → redirect
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    // Jika accessToken ada, tetap verify
    const res = await fetch(`${BASE_URL}/token/verify-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Refresh token invalid atau error → redirect
      const response = NextResponse.redirect(new URL("/sign-in", req.url));
      // response.cookies.delete("accessToken");
      return response;
    }

    // Jika backend mengembalikan accessToken baru, set cookie
    const nextResponse = NextResponse.next();
    if (data.accessToken) {
      nextResponse.cookies.set("accessToken", data.accessToken, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
    }

    return nextResponse;
  } catch (err) {
    console.log("Middleware error:", err);
    const response = NextResponse.redirect(new URL("/sign-in", req.url));
    return response;
  }
};
