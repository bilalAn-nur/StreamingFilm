import { BASE_URL } from "@/config";
import { NextResponse } from "next/server";

export const requireAuth = async (req) => {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    const res = await fetch(`${BASE_URL}/token/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
        refreshToken,
      }),
    });
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
