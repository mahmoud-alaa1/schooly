import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    { message: "This is a placeholder for Agora token generation endpoint." },
    { status: 200 },
  );
}
