import Hero from "@/components/Hero";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import Posts from "@/components/posts/PostsList";
import SideBar from "@/components/SideBar";

export default function Page() {
  return (
    <div>
      <HomeHeader />
      <main className="p-5">
        <div className="grid h-[calc(100dvh-118px)] grid-cols-1 gap-5 md:grid-cols-[2fr_1fr]">
          <div className="scrollbar-hide h-full space-y-5 overflow-auto">
            <Hero />
            <div className="">
              <Posts />
            </div>
          </div>
          <SideBar />
        </div>
      </main>
    </div>
  );
}
