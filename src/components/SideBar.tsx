"use client";
import UpcomingLessons from "@/components/lessons/upcoming-lessons/UpcomingLessonsList";
import HomeworksList from "@/components/Homeworks/HomeworksList";
import { useViewport } from "@/hooks/useViewport";
import LiveLesson from "./lessons/live-lesson/LiveLesson";

function SideBar() {
  const isLargeScreen = useViewport(768);

  if (!isLargeScreen) {
    return null;
  }
  return (
    <aside className="scrollbar-hide flex flex-col gap-5 overflow-auto rounded-lg">
      <LiveLesson />
      <UpcomingLessons />
      <HomeworksList />
    </aside>
  );
}

export default SideBar;
