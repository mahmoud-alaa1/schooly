"use client";

import { AiOutlineClockCircle } from "react-icons/ai";
import LessonSkeleton from "./LessonSkeleton";
import useUpcomingLessons from "@/hooks/useUpcomingLessons";
import Lesson from "./Lesson";
import SideCard from "../SideCard";
import { UPCOMING_LESSONS_PAGE_SIZE } from "@/lib/constants";

export default function UpcomingLessons() {
  const {
    error,
    data,
    isPending,
  } = useUpcomingLessons();
  const lessons: TLesson[] =
    data?.pages.reduce<TLesson[]>((curr, upcomignLessonResponse) => {
      return [...curr, ...upcomignLessonResponse.data];
    }, []) || new Array(UPCOMING_LESSONS_PAGE_SIZE).fill(null);
  if (error) return <p>Something went wrong</p>;

  return (
    <SideCard
      className="h-[460.8px]"
      items={lessons}
      renderItem={(lesson: TLesson, idx) =>
        isPending ? (
          <LessonSkeleton key={`lesson-skeleton-${idx}`} />
        ) : (
          <Lesson key={`lesson-id-${lesson.id}`} lesson={lesson} />
        )
      }
      CardIcon={<AiOutlineClockCircle />}
      cardTitle="حصصك القادمة"
    />
  );
}
