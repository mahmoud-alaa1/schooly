import { getUpcomingLessons } from "@/services/lessons";

import { AiOutlineClockCircle } from "react-icons/ai";

import Lesson from "./Lesson";


export default async function UpcomingLessons() {
  const upComingLessons = await getUpcomingLessons();

  const { data: lessons } = upComingLessons;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl border-2 border-neutral-200 ">
      <h2 className="border-b border-neutral-200 flex items-center gap-x-1 py-4 px-6 font-medium">
        <AiOutlineClockCircle className="text-xl " />
        حصصك القادمة
      </h2>
      <ul className="p-6">
        {lessons.map((val) => {
          return <Lesson key={val.id} details={val} />;
        })}
      </ul>
    </div>
  );
}
