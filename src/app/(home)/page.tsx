import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeworksList from "@/components/Homeworks/HomeworksList";
import Posts from "@/components/posts/PostsList";
import UpcomingLessons from "@/components/UpcomingLessons/UpcomingLessonsList";

export default function Page() {
  return (
    <div className="">
      <HomeHeader />
      <main className="scrollbar-hide grid h-[calc(100vh-100px)] grid-cols-[1fr_300px] gap-5 overflow-auto p-5">
        <Posts />
        <aside className="hidden h-[calc(100vh-140px)] flex-col gap-5 overflow-auto rounded-lg xl:flex">
          <UpcomingLessons />
          <HomeworksList />
        </aside>
      </main>
    </div>
  );
}
