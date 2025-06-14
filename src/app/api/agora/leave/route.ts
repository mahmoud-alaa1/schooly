import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "تم مغادرة الحصة" });

  response.cookies.set("agora-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
