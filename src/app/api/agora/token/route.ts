import { joinLesson } from "@/services/lessonServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    console.log("Request body:", body);
    const res = await joinLesson(body);

    console.log("Response from joinLesson:", res);
    const response = NextResponse.json({ ...res });

    console.log("Setting cookie with token:", res.data.token);
    const cookieExpiration = 60 * 60 * 3; // 3 hours

    response.cookies.set("agora-token", res.data.token, {
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
