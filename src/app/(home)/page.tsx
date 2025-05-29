import HomeworksList from "@/components/Homeworks/HomeworksList";
import Posts from "@/components/posts/PostsList";
import SideNav from "@/components/SideNav/SideNav";
import UpcomingLessons from "@/components/UpcomingLessons/UpcomingLessonsList";

export default function Page() {
  return (
    <div className="grid grid-cols-[clamp(300px,25vw,360px)_auto] xl:grid-cols-[clamp(300px,25vw,360px)_auto_clamp(300px,25vw,360px)]">
      <aside className="scrollbar-hide min-h-screen overflow-auto border-2 border-[#D9D9D9]">
        <SideNav />
      </aside>
      {/* <main
        dir="ltr"
        className="scrollbar-hide h-[calc(100vh-140px)] overflow-auto"
      >
        <Posts />
      </main>
      <aside className="hidden h-[calc(100vh-140px)] flex-col gap-5 overflow-auto rounded-lg xl:flex">
        <UpcomingLessons />
        <HomeworksList />
      </aside> */}
    </div>
  );
}
