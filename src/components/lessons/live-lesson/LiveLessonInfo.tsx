"use client";
import { ILesson } from "@/types/lessons";
import Image from "next/image";

interface LiveLessonInfoProps {
  lesson: ILesson;
}

const LiveLessonInfo = ({ lesson }: LiveLessonInfoProps) => (
  <div className="flex items-center gap-3">
    <Image
      src="/physics.webp"
      width={60}
      height={60}
      alt="subject logo"
      className="rounded-md"
    />
    <div>
      <h4 className="text-sm text-gray-500">
        {lesson.subject} / {lesson.grade}
      </h4>
      <p className="text-sm font-medium">{lesson.title}</p>
    </div>
  </div>
);

export default LiveLessonInfo;
