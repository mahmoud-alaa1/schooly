import { NextRequest, NextResponse } from "next/server";
import { loginsService } from "@/services/authenticationServices";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Request body:", body);

    const res = await loginsService(body);

    const response = NextResponse.json({ ...res });

    const cookieExpiration = body.rememberMe
      ? 60 * 60 * 24 * 30 // 30 days
      : 60 * 60 * 2; // 2 hours

    response.cookies.set("token", res.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: cookieExpiration,
      sameSite: "none",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "حدث خطأ ما في تسجيل الدخول" },
      { status: 400 },
    );
  }
}
