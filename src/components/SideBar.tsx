"use client";
import UpcomingLessons from "@/components/UpcomingLessons/UpcomingLessonsList";
import HomeworksList from "@/components/Homeworks/HomeworksList";
import { useViewport } from "@/hooks/useViewport";

function SideBar() {
  const isLargeScreen = useViewport(768);

  if (!isLargeScreen) {
    return null;
  }
  return (
    <aside className="scrollbar-hide flex flex-col gap-5 overflow-auto rounded-lg">
      <UpcomingLessons />
      <HomeworksList />
    </aside>
  );
}

export default SideBar;
