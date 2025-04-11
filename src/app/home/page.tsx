import Homework from "@/components/Homework/Homework";
import Navbar from "@/components/Navbar/Navbar";
import Posts from "@/components/Posts/Posts";
import SideNavbar from "@/components/SideNavbar";
import UpcomingLessons from "@/components/UpcomingLessons/UpcomingLessons";

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <>
      <Navbar className="mb-4" />
      <div className="grid grid-cols-[minmax(200px,220px)_minmax(400px,auto)_minmax(350px,400px)] gap-4">
        <SideNavbar />
        <Posts />
        <div className="flex flex-col gap-4">
          <UpcomingLessons />
          <Homework />
        </div>
      </div>
    </>
  );
}
