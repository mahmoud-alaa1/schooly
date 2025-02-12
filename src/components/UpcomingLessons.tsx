import { getUpcomingLessons } from "@/services/lessons";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import Lesson from "./Lesson";

export default async function UpcomingLessons() {
  const upComingLessons = await getUpcomingLessons();
  const { data: lessons } = upComingLessons;
  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl border-2 border-neutral-200 ">
      <div className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6">
        <AiOutlineClockCircle className="text-xl" />
        حصصك القادمة
      </div>
      <div className="p-6">
        {lessons.map((val) => {
          return <Lesson key={val.id} details={val} />;
        })}
      </div>
    </div>
  );
}
