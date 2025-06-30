import { JoinLessonData } from "@/components/cam-verifaction/Verification";
import { getLessonCookieExpiry } from "@/lib/cookies/getLessonCookieExpiry";
import { base64ToBlob } from "@/lib/utils";
import { joinLesson } from "@/services/lessonServices";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: JoinLessonData = await req.json();

    const { image, lesson, classroomId } = body;

    if (!image || !lesson.id) {
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
      lesson.id,
      req.cookies.get("token")?.value,
    );

    const response = NextResponse.json({ ...res });

    response.cookies.set("agora-token", res.data.token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: getLessonCookieExpiry(lesson),
      sameSite: "none",
    });

    return response;
  } catch (error) {
    if (isAxiosError<IErrorResponse>(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message,
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
