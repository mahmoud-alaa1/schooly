import ClassroomHero from "@/components/ClassroomHero";
import CreateNew from "@/components/create-new/CreateNew";
import HomeHeader from "@/components/home-header/HomeHeader";
import Posts from "@/components/posts/PostsList";
import SideBar from "@/components/SideBar";

export default function Page() {
  return (
    <div>
      <HomeHeader />
      <main className="p-5">
        <div className="grid h-[calc(100dvh-118px)] grid-cols-1 gap-5 md:grid-cols-[2fr_1fr]">
          <div className="scrollbar-hide h-full space-y-5 overflow-auto">
            <ClassroomHero />
            <CreateNew />
            <Posts />
          </div>
          <SideBar />
        </div>
      </main>
    </div>
  );
}
