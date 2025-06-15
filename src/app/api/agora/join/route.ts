import { base64ToBlob } from "@/lib/utils";
import { joinLesson } from "@/services/lessonServices";
import { isAxiosError } from "axios";
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
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          data: error.response?.data ?? { message: error.message },
        },
        {
          status: error.response?.status || 500,
        },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
