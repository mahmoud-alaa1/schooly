"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UPCOMING_LESSONS_PER_PAGE } from "@/lib/constants";
import { ILesson } from "@/types/lessons";
import React, { forwardRef } from "react";
import LessonItem from "./lesson-item/LessonItem";
import HomeworkDetailsSkeleton from "../Homeworks/homeworks/HomeworkDetailsSkeleton";
import RoleGuard from "../RoleGuard";

interface LessonListProps {
  lessons: ILesson[] | undefined;
  isFetching: boolean;
  ref: React.RefObject<Element | null>;
}

const LessonList = forwardRef<HTMLDivElement, LessonListProps>(
  ({ lessons, isFetching }, ref) => {
    return (
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>الحصص</CardTitle>
          <RoleGuard role="TEACHER">
            <CardDescription>إدارة الحصص</CardDescription>
          </RoleGuard>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lessons?.map((lesson, index) => (
              <div
                key={lesson.id}
                ref={index === lessons.length - 1 ? ref : undefined}
              >
                <LessonItem lesson={lesson} />
              </div>
            ))}

            {isFetching && (
              <>
                {Array.from({ length: UPCOMING_LESSONS_PER_PAGE }).map(
                  (_, i) => (
                    <HomeworkDetailsSkeleton key={i} />
                  ),
                )}
              </>
            )}
            {lessons?.length === 0 && !isFetching && (
              <div className="flex items-center justify-center rounded-2xl bg-white p-6">
                <p className="text-red-500">لا توجد حصص لعرضها</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
);

LessonList.displayName = "LessonList";

export default LessonList;
