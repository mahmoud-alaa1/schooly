import Posts from "@/components/Posts/Posts";
import SideNavbar from "@/components/SideNavbar";
import UpcomingLessons from "@/components/UpcomingLessons/UpcomingLessons";

export default async function Page() {
  return (
    <div className="grid grid-cols-[minmax(200px,220px)_auto_minmax(330px,400px)] gap-4">
      <SideNavbar />
      <Posts />
      <div className="flex flex-col gap-4">
        <UpcomingLessons />
      </div>
    </div>
  );
}
