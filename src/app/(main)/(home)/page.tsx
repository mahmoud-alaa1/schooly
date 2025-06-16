import Hero from "@/components/Hero";
import Posts from "@/components/posts/PostsList";
import RoleGuard from "@/components/RoleGuard";
import SideBar from "@/components/SideBar";

export default function Page() {
  return (
    <main className="p-5">
      <div className="grid h-[calc(100dvh-118px)] grid-cols-1 gap-5 md:grid-cols-[2fr_1fr]">
        <div className="scrollbar-hide h-full space-y-5 overflow-auto">
          <RoleGuard role="TEACHER">
            <Hero />
          </RoleGuard>
          <Posts />
        </div>
        <SideBar />
      </div>
    </main>
  );
}
