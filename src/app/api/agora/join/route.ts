import { base64ToBlob } from "@/lib/utils";
import { joinLesson } from "@/services/lessonServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { image, lessonId } = body;

    if (!image || !lessonId) {
      return NextResponse.json(
        { message: "Missing required fields: image or lessonId" },
        { status: 400 },
      );
    }

    const formData = new FormData();
    const imageBlob = base64ToBlob(image);
    formData.append("image", imageBlob);

    const res = await joinLesson(
      formData,
      lessonId,
      req.cookies.get("token")?.value,
    );

    const response = NextResponse.json({ ...res });

    const cookieExpiration = 60 * 60 * 5;
    response.cookies.set("agora-token", res.data.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: cookieExpiration,
      sameSite: "none",
    });

    return response;
  } catch (error) {
    const message =
      typeof (error as any).message === "string"
        ? (error as any).message
        : JSON.stringify((error as any).message);

    console.log(`i'm the route server error`, message);
    return NextResponse.json(
      {
        message: message || "حدث خطأ ما في تحقق الهوية",
      },
      { status: 400 },
    );
  }
}
