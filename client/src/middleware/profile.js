import { BASE_URL } from "@/config";
import { NextResponse } from "next/server";

export const requireProfile = async (req) => {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    const res = await fetch(`${BASE_URL}/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken};`,
      },
    });

    if (!res.ok) {
      const response = NextResponse.redirect(new URL("/sign-in", req.url));
      response.cookies.delete("refreshToken");
      return response;
    }

    const data = await res.json();
    const nextResponse = NextResponse.next();

    nextResponse.headers.set("Authorization", `Bearer ${data.accessToken}`);
    return nextResponse;
  } catch (err) {
    console.error("Middleware error:", err);
    const response = NextResponse.redirect(new URL("/sign-in", req.url));
    response.cookies.delete("refreshToken");
    return response;
  }
};
