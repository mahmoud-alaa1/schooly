"use client";
import React from "react";
import { Button } from "../ui/button";
import { Clock } from "lucide-react";
import useUpcomingLessons from "@/hooks/lessons/useUpcomingLessons";
import { Box, BoxBody, BoxHeader } from "../Box";
import Link from "next/link";
import UpcomingLessonsItem from "./UpcomingLessonsItem";
import UpcomingLessonSkeleton from "./UpcomingLessonSkeleton";
import { UPCOMING_LESSONS_PER_PAGE } from "@/lib/constants";
export default function UpcomingLessonsList() {
  const { data, isLoading, isError } = useUpcomingLessons();

  // mock data for testing intefacr ILesson[]
  const mockLessons: ILesson[] = [
    {
      id: "1",
      classRoomId: "class-1",
      teacherId: "teacher-1",
      subject: "فيزياء",
      grade: "الصف الأول إعدادي",
      title: "الدرس الخامس: الضرب الإتجاهي والقياسي",
      lessonType: 0,
      date: "2025-10-01",
      from: "10:00",
      to: "11:00",
    },
    {
      id: "2",
      classRoomId: "class-2",
      teacherId: "teacher-2",
      subject: "كيمياء",
      grade: "الصف الأول إعدادي",
      title: "مقدمة في الكيمياء العضوية",
      lessonType: 0,
      date: "2025-6-2",
      from: "6:30",
      to: "12:00",
    },
    {
      id: "3",
      classRoomId: "class-3",
      teacherId: "teacher-3",
      subject: "رياضيات",
      grade: "الصف الأول إعدادي",
      title: "حل المعادلات الخطية",
      lessonType: 0,
      date: "2025-5-30",
      from: "20:00",
      to: "22:00",
    },
    {
      id: "4",
      classRoomId: "class-4",
      teacherId: "teacher-4",
      subject: "علوم",
      grade: "الصف الأول إعدادي",
      title: "مقدمة في علم الأحياء",
      lessonType: 0,
      date: "2025-5-30",
      from: "13:00",
      to: "14:00",
    },
  ];

  return (
    <Box>
      <BoxHeader>
        <div className="flex items-center gap-2">
          <Clock size={18} />
          <h3 className="font-medium">حصصك القادمة</h3>
        </div>
        <Link href="/table">
          <Button variant="link" className="p-0">
            الكل
          </Button>
        </Link>
      </BoxHeader>
      <BoxBody>
        {/* <ul className="list-none">
          {mockLessons.map((lesson) => (
            <UpcomingLessonsItem key={lesson.id} lesson={lesson} />
          ))}
        </ul> */}
        {/* {isLoading && ( */}
        <>
          {Array.from({ length: UPCOMING_LESSONS_PER_PAGE }).map((_, i) => (
            <UpcomingLessonSkeleton key={i} />
          ))}
        </>
        {/* )} */}
      </BoxBody>
    </Box>
  );
}
