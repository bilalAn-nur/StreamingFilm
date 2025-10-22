import { BASE_URL } from "@/config";
import { NextResponse } from "next/server";

export const requireProfile = async (req) => {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    const res = await fetch(`${BASE_URL}/token/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken};`,
      },
    });

    if (!res.ok) {
      const response = NextResponse.redirect(new URL("/sign-in", req.url));
      response.cookies.delete("accessToken");
      return response;
    }

    const nextResponse = NextResponse.next();

    return nextResponse;
  } catch (err) {
    console.error("Middleware error:", err);
    const response = NextResponse.redirect(new URL("/sign-in", req.url));
    response.cookies.delete("accessToken");
    return response;
  }
};
