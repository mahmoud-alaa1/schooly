"use client";

import { AiOutlineClockCircle } from "react-icons/ai";
import { Suspense } from "react";
import UpcomingLessonsContent from "./UpcomingLessonsContent";
import LessonSkeleton from "./LessonSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getUpcomingLessons } from "@/services/lessons";
import { useSession } from "next-auth/react";

export default function UpcomingLessons() {
  getUpcomingLessons();

  console.log(useSession());

  return (
    <div className="max-w-lg h-fit bg-white rounded-2xl border-2 border-neutral-200">
      <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
        <AiOutlineClockCircle className="text-xl" />
        حصصك القادمة
      </h2>
      <Suspense
        fallback={
          <div className="p-6">
            <LessonSkeleton />
            <LessonSkeleton />
            <LessonSkeleton />
          </div>
        }
      ></Suspense>
    </div>
  );
}
