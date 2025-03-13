"use client";
import { TLesson, TUpcomingLessons } from "@/types/lessons";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { AiOutlineClockCircle } from "react-icons/ai";
import LessonSkeleton from "./LessonSkeleton";
import useUpcomingLessons from "@/services/useUpcomingLessons";
import Lesson from "./Lesson";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UpcomingLessons() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  const { data, isLoading, error } = useUpcomingLessons(currentPage);
  const response = data ?? ({} as TUpcomingLessons);

  const lessons: TLesson[] = response.data || [];
  if (!isLoading && !error && response.meta.totalPages && totalPages === null) {
    setTotalPages(response.meta.totalPages);
  }
  return (
    <div className="max-w-lg h-fit  bg-white rounded-2xl border-2 border-neutral-200 flex flex-col">
      <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
        <AiOutlineClockCircle className="text-xl" />
        حصصك القادمة
      </h2>
      {isLoading ? (
        <div className="p-6 pb-0">
          <LessonSkeleton />
          <LessonSkeleton />
          <LessonSkeleton />
        </div>
      ) : error ? (
        error.message
      ) : (
        <>
          <ul className="p-6 pb-0">
            {lessons.map((lesson) => (
              <Lesson key={lesson.id} details={lesson} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
