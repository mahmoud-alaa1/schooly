"use client";
import { ILesson } from "@/types/lessons";
import React from "react";
import LessonInfo from "./LessonInfo";

interface ILessonProps {
  lesson: ILesson;
}

function LessonItem({ lesson }: ILessonProps) {
  return (
    <div className="rounded-lg border p-4 transition-colors hover:bg-gray-50">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <LessonInfo lesson={lesson} />
      </div>
    </div>
  );
}

export default LessonItem;
