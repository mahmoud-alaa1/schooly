"use client";
import React from "react";
import { Button } from "../../ui/button";
import { Clock } from "lucide-react";
import useUpcomingLessons from "@/hooks/lessons/useUpcomingLessons";
import { Box, BoxBody, BoxHeader } from "../../Box";
import Link from "next/link";
import { UPCOMING_LESSONS_PER_PAGE } from "@/lib/constants";
import UpcomingLessonsItem from "./UpcomingLessonsItem";
import UpcomingLessonSkeleton from "./UpcomingLessonSkeleton";
export default function UpcomingLessonsList() {
  const { data, isLoading, isError } = useUpcomingLessons();
  const lessons = data?.pages.flatMap((page) => page.data);
  return (
    <Box>
      <BoxHeader>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <h3 className="font-medium">حصصك القادمة</h3>
        </div>
      </BoxHeader>
      <BoxBody>
        {isError ? (
          <p className="text-red-500">حدث خطأ أثناء تحميل الدروس القادمة.</p>
        ) : lessons?.length === 0 && !isLoading ? (
          <p className="text-gray-500">لا توجد حصص قادمة.</p>
        ) : (
          <ul className="list-none">
            {lessons?.map((lesson) => (
              <UpcomingLessonsItem key={lesson?.id} lesson={lesson} />
            ))}
          </ul>
        )}
        {isLoading && (
          <>
            {Array.from({ length: UPCOMING_LESSONS_PER_PAGE }).map((_, i) => (
              <UpcomingLessonSkeleton key={i} />
            ))}
          </>
        )}
      </BoxBody>
    </Box>
  );
}
