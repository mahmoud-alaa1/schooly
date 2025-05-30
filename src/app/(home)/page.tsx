import HomeHeader from "@/components/HomeHeader/HomeHeader";
import Posts from "@/components/posts/PostsList";
import SideBar from "@/components/SideBar";

export default function Page() {
  return (
    <div>
      <HomeHeader />
      <main className="scrollbar-hide grid h-[calc(100vh-100px)] grid-cols-1 gap-5 overflow-auto p-5 sm:grid-cols-[2fr_1fr]">
        <Posts />
        <SideBar />
      </main>
    </div>
  );
}
