import { getUpcomingLessons } from "@/services/lessons";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

export default async function UpcomingLessons() {
  const lessons = await getUpcomingLessons();
  console.log(lessons);
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-neutral-200 ">
      <div className="border-b border-neutral-200 flex items-center gap-x-1 p-4">
        <AiOutlineClockCircle className="text-xl" />
        حصصك القادمة
      </div>
      <div>1 2 3 4 5</div>
    </div>
  );
}
