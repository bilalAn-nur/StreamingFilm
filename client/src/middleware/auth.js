import { NextResponse } from "next/server";

export const requireAuth = (req) => {
  const accessToken = req.cookies.get("refreshToken")?.value;

  if (accessToken) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
};
