// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { loginsService } from "@/services/authenticationServices";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await loginsService(body);

    const response = NextResponse.json(res);
    const maxAge = body.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 2;

    response.cookies.set("token", res.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge,
      sameSite: "none",
    });

    return response;
  } catch (error) {
    if (isAxiosError<IErrorResponse>(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "حدث خطا ما",
        },
        {
          status: error.response?.status || 500,
        },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
