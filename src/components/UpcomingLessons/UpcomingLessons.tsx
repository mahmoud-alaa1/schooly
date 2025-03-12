"use client";
import { TLesson, TUpcomingLessons } from "@/types/lessons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
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
  const { data, isLoading, error } = useUpcomingLessons(currentPage);

  if (isLoading) {
    return (
      <div className="max-w-lg h-fit bg-white rounded-2xl border-2 border-neutral-200">
        <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
          <AiOutlineClockCircle className="text-xl" />
          حصصك القادمة
        </h2>
        <div className="p-6">
          <LessonSkeleton />
          <LessonSkeleton />
          <LessonSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    <div className="max-w-lg h-fit bg-white rounded-2xl border-2 border-neutral-200">
      <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
        <AiOutlineClockCircle className="text-xl" />
        حصصك القادمة
      </h2>
      {error.message}
    </div>;
  }

  const response = data as TUpcomingLessons;

  const lessons: TLesson[] = response.data || [];
  const totalPage = response.meta.totalPages;

  return (
    <div className="max-w-lg h-fit bg-white rounded-2xl border-2 border-neutral-200">
      <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
        <AiOutlineClockCircle className="text-xl" />
        حصصك القادمة
      </h2>

      <>
        <ul className="p-6 pb-0">
          {lessons.map((lesson) => (
            <Lesson key={lesson.id} details={lesson} />
          ))}
        </ul>
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
            <PaginationItem>
              {data?.meta.totalPages - currentPage > 3 && (
                <PaginationEllipsis />
              )}
            </PaginationItem>

            <ul className="flex flex-row-reverse">
              {Array.from({ length: 3 }).map((_, index) => {
                const pageNumber: number =
                  (Math.ceil(currentPage / totalPage) - 1) * 3 + index + 1;
                if (pageNumber > totalPage) return null;
                return (
                  <PaginationItem key={`pagination` + index}>
                    <Button
                      onClick={() => setCurrentPage(pageNumber)}
                      size="default"
                      disabled={currentPage === pageNumber}
                      className={cn("disabled:bg-red")}
                      variant={currentPage === pageNumber ? "outline" : "ghost"}
                    >
                      {pageNumber}
                    </Button>
                  </PaginationItem>
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
      </>
    </div>
  );
}
