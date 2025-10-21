import { NextResponse } from "next/server";

export const requireProfile = (req) => {
  const accessToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken) {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};
