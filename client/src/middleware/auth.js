import { BASE_URL } from "@/config";
import { NextResponse } from "next/server";

export const requireAuth = async (req) => {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;

    const res = await fetch(`${BASE_URL}/token/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken};`,
      },
    });
    if (res.ok) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  } catch (err) {
    return NextResponse.next();
  }
};
