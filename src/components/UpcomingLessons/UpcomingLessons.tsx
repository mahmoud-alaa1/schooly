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
  console.log(totalPages);
  return (
    <div className="max-w-lg h-fit bg-white rounded-2xl border-2 border-neutral-200">
      <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
        <AiOutlineClockCircle className="text-xl" />
        حصصك القادمة
      </h2>
      {isLoading ? (
        <div className="px-6">
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
      <Pagination className="mb-2 px-2">
        <PaginationContent>
          <PaginationItem>
            <Button
              aria-label="Go to previous page"
              size="default"
              className={cn("gap-1 pr-2.5")}
              variant="ghost"
              disabled={currentPage === data?.meta.totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight />
              التالي
            </Button>
          </PaginationItem>

          <ul className="flex flex-row-reverse gap-1">
            {Array.from({ length: 3 }).map((_, index) => {
              const pageNumber: number =
                (Math.ceil(currentPage / 3) - 1) * 3 + index + 1;
              return (
                pageNumber <= totalPages! && (
                  <PaginationItem key={`pagination` + index}>
                    <Button
                      onClick={() => setCurrentPage(pageNumber)}
                      size="default"
                      disabled={currentPage === pageNumber}
                      className={cn(
                        "disabled:opacity-100 disabled:cursor-not-allowed"
                      )}
                      variant={currentPage === pageNumber ? "outline" : "ghost"}
                    >
                      {pageNumber}
                    </Button>
                  </PaginationItem>
                )
              );
            })}
          </ul>
          <PaginationItem>
            <Button
              aria-label="Go to previous page"
              size="default"
              className={cn("gap-1 pr-2.5")}
              variant="ghost"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              السابق
              <ChevronLeft />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
