import { BASE_URL } from "@/config";
import { NextResponse } from "next/server";

export const requireUser = async (req) => {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    const res = await fetch(`${BASE_URL}/token/verify-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    if (data.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

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
