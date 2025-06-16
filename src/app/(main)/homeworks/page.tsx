import HomeHeader from "@/components/home-header/HomeHeader";
import TeacherHomeworkPage from "@/components/Homeworks/teacher/Homework-teacher";

export default function page() {
  return (
    <div>
      <HomeHeader />
      <main className="p-5">
        <div className="scrollbar-hide h-[calc(100dvh-118px)] gap-5 space-y-5 overflow-auto">
          <TeacherHomeworkPage />
        </div>
      </main>
    </div>
  );
}
