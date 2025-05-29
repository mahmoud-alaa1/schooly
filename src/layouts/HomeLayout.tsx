import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeworksList from "@/components/Homeworks/HomeworksList";
import SideNav from "@/components/SideNav/SideNav";
import UpcomingLessons from "@/components/UpcomingLessons/UpcomingLessonsList";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <HomeHeader />
      <div className="mt-5 grid grid-cols-[clamp(300px,25vw,360px)_auto] gap-5 xl:grid-cols-[clamp(300px,25vw,360px)_auto_clamp(300px,25vw,360px)]">
        <aside className="scrollbar-hide h-[min(calc(100dvh-140px),774px)] overflow-auto rounded-lg border-2 bg-white">
          <SideNav />
        </aside>
        <main
          dir="ltr"
          className="scrollbar-hide h-[calc(100dvh-140px)] overflow-auto"
        >
          {children}
        </main>
        <aside className="hidden h-[calc(100dvh-140px)] flex-col gap-5 overflow-auto rounded-lg xl:flex">
          <UpcomingLessons />
          <HomeworksList />
        </aside>
      </div>
    </div>
  );
}
