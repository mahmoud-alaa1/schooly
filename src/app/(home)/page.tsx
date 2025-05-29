import HomeworksList from "@/components/Homeworks/HomeworksList";
import Posts from "@/components/posts/PostsList";
import SideNav from "@/components/SideNav/SideNav";
import UpcomingLessons from "@/components/UpcomingLessons/UpcomingLessonsList";

export default function Page() {
  return (
    <div className="mt-5 grid grid-cols-[clamp(300px,25vw,360px)_auto] gap-5 xl:grid-cols-[clamp(300px,25vw,360px)_auto_clamp(300px,25vw,360px)]">
      <aside className="scrollbar-hide h-[min(calc(100vh-140px),774px)] overflow-auto rounded-lg border-2 bg-white">
        <SideNav />
      </aside>
      <main
        dir="ltr"
        className="scrollbar-hide h-[calc(100vh-140px)] overflow-auto"
      >
        <Posts />
      </main>
      <aside className="hidden h-[calc(100vh-140px)] flex-col gap-5 overflow-auto rounded-lg xl:flex">
        <UpcomingLessons />
        <HomeworksList />
      </aside>
    </div>
  );
}
