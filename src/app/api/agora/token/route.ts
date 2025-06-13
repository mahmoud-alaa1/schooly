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

    const imageBlob = base64ToBlob(image);

    // Create FormData for the joinLesson service
    const formData = new FormData();
    formData.append("image", imageBlob, "image.jpg");

    console.log("Joining lesson with ID:", lessonId, formData);
    const res = await joinLesson(formData, lessonId);

    const response = NextResponse.json({ ...res });

    if (res.data.token) {
      const cookieExpiration = 60 * 60 * 3; // 3 hours
      response.cookies.set("agora-token", res.data.token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: cookieExpiration,
        sameSite: "none",
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message || "حدث خطأ ما في تحقق الهوية" },
      { status: 400 },
    );
  }
}
