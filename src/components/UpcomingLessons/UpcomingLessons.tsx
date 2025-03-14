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
import SideCard from "../SideCard";

export default function UpcomingLessons() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useUpcomingLessons(currentPage);
  const response = data ?? ({} as TUpcomingLessons);

  const lessons: TLesson[] = response.data || [];
  return (
    <SideCard
      items={lessons}
      renderItem={(lesson: TLesson) => (
        <Lesson key={lesson.id} lesson={lesson} />
      )}
      CardIcon={<AiOutlineClockCircle />}
      cardTitle="حصصك القادمة"
    />
  );
}
