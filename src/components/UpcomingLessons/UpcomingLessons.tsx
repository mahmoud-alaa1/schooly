"use client";
import { TLesson } from "@/types/lessons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AiOutlineClockCircle } from "react-icons/ai";
import LessonSkeleton from "./LessonSkeleton";
import useUpcomingLessons from "@/services/useUpcomingLessons";
import Lesson from "./Lesson";

export default function UpcomingLessons() {
  const res = useUpcomingLessons();
  const lessons: TLesson[] = res.data?.data || [];

  return (
    <div className="max-w-lg h-fit bg-white rounded-2xl border-2 border-neutral-200">
      <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
        <AiOutlineClockCircle className="text-xl" />
        حصصك القادمة
      </h2>
      {res.isLoading ? (
        <div className="p-6">
          <LessonSkeleton />
          <LessonSkeleton />
          <LessonSkeleton />
        </div>
      ) : (
        <>
          <ul className="p-6 pb-0">
            {lessons.map((lesson) => (
              <Lesson key={lesson.id} details={lesson} />
            ))}
          </ul>
          <Pagination className="mb-2 px-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
