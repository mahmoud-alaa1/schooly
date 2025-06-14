"use client";
import { ILesson } from "@/types/lessons";
import LiveBadge from "./LiveBadge";
import LiveLessonInfo from "./LiveLessonInfo";

interface LiveLessonHeaderProps {
  lesson: ILesson;
}

const LiveLessonHeader = ({ lesson }: LiveLessonHeaderProps) => (
  <div className="flex items-center justify-between gap-1.5">
    <LiveLessonInfo lesson={lesson} />
    <LiveBadge />
  </div>
);

export default LiveLessonHeader;
