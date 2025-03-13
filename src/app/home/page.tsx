import SideNavbar from "@/components/SideNavbar";
import UpcomingLessons from "@/components/UpcomingLessons/UpcomingLessons";
import { Sidebar } from "lucide-react";

export default async function Page() {
  return (
    <div className="grid grid-cols-[minmax(200px,220px)_auto_minmax(330px,400px)] gap-4">
      <SideNavbar />
      <div className="h-[1000px] bg-white rounded-xl border border-[#D9D9D9]"></div>
      <div className="flex flex-col gap-4">
        <UpcomingLessons />
      </div>
    </div>
  );
}
